// Alba "brief is ready" card: a small, silent panel that floats above every app, bottom-right of the screen.
// Built once by the backend (swiftc) and started with:
//   alba-toast <label> <date> <headline> <counts> <icon path> <app to open on click> [seconds] [image path] [weekday]
// It shows itself, waits, fades out and exits. It never takes the focus and makes no sound.
// A click opens the app; hovering keeps it on screen.
import AppKit

let argv = CommandLine.arguments
func arg(_ i: Int) -> String { i < argv.count ? argv[i] : "" }
let label = arg(1), dateText = arg(2), headline = arg(3), counts = arg(4), iconPath = arg(5), openApp = arg(6)
let seconds = Double(arg(7)) ?? 10
let art = NSImage(contentsOfFile: arg(8))
let weekday = arg(9)

final class Card: NSView {
    var onClick: () -> Void = {}
    var onHover: (Bool) -> Void = { _ in }
    override var isFlipped: Bool { true }
    override func updateTrackingAreas() {
        super.updateTrackingAreas()
        trackingAreas.forEach(removeTrackingArea)
        addTrackingArea(NSTrackingArea(rect: bounds, options: [.mouseEnteredAndExited, .activeAlways], owner: self, userInfo: nil))
    }
    override func mouseEntered(with event: NSEvent) { onHover(true) }
    override func mouseExited(with event: NSEvent) { onHover(false) }
    override func mouseUp(with event: NSEvent) { onClick() }
    override func acceptsFirstMouse(for event: NSEvent?) -> Bool { true }
    override func resetCursorRects() { addCursorRect(bounds, cursor: .pointingHand) }
}

// the painting, scaled to fill the band and cropped around its centre, darkened towards the bottom so the text reads
final class ArtView: NSView {
    var image: NSImage?
    override var isFlipped: Bool { true }
    override func draw(_ dirtyRect: NSRect) {
        guard let image = image, image.size.width > 0, image.size.height > 0 else { return }
        bounds.clip()   // views no longer clip their drawing by default: keep the painting inside its band
        let k = max(bounds.width / image.size.width, bounds.height / image.size.height)
        let w = image.size.width * k, h = image.size.height * k
        NSGraphicsContext.current?.imageInterpolation = .high
        image.draw(in: NSRect(x: (bounds.width - w) / 2, y: (bounds.height - h) * 0.42, width: w, height: h),
                   from: .zero, operation: .sourceOver, fraction: 1, respectFlipped: true, hints: nil)
        NSGradient(colorsAndLocations: (NSColor(white: 0, alpha: 0.04), 0), (NSColor(white: 0, alpha: 0.16), 0.45), (NSColor(white: 0, alpha: 0.64), 1))?
            .draw(in: bounds, angle: 90)
    }
}

func text(_ s: String, _ font: NSFont, _ color: NSColor, lines: Int = 1) -> NSTextField {
    let t = NSTextField(wrappingLabelWithString: s)
    t.font = font
    t.textColor = color
    t.maximumNumberOfLines = lines
    t.lineBreakMode = lines == 1 ? .byTruncatingTail : .byWordWrapping
    t.cell?.truncatesLastVisibleLine = true
    t.isSelectable = false
    t.drawsBackground = false
    t.setContentCompressionResistancePriority(.defaultLow, for: .horizontal)
    return t
}

func serif(_ size: CGFloat, italic: Bool = false) -> NSFont {
    let base = NSFont.systemFont(ofSize: size, weight: .regular)
    var d = base.fontDescriptor.withDesign(.serif) ?? base.fontDescriptor
    if italic { d = d.withSymbolicTraits(.italic) }
    return NSFont(descriptor: d, size: size) ?? base
}

func caps(_ s: String, _ size: CGFloat, _ color: NSColor) -> NSTextField {
    let t = NSTextField(labelWithAttributedString: NSAttributedString(string: s.uppercased(), attributes: [
        .font: NSFont.systemFont(ofSize: size, weight: .semibold), .foregroundColor: color, .kern: 1.0]))
    t.drawsBackground = false
    return t
}

let app = NSApplication.shared
app.setActivationPolicy(.accessory)

let width: CGFloat = 328
let pad: CGFloat = 14
let band: CGFloat = art == nil ? 0 : 78
let panel = NSPanel(contentRect: NSRect(x: 0, y: 0, width: width, height: 100),
                    styleMask: [.borderless, .nonactivatingPanel], backing: .buffered, defer: false)
panel.level = .statusBar
panel.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary, .stationary, .ignoresCycle]
panel.isOpaque = false
panel.backgroundColor = .clear
panel.hasShadow = true
panel.hidesOnDeactivate = false
panel.isMovable = false

let card = Card(frame: NSRect(x: 0, y: 0, width: width, height: 100))
card.wantsLayer = true
card.layer?.cornerRadius = 13
card.layer?.masksToBounds = true
card.layer?.borderWidth = 1
card.layer?.borderColor = NSColor(white: 1, alpha: 0.10).cgColor

let glass = NSVisualEffectView(frame: card.bounds)
glass.autoresizingMask = [.width, .height]
glass.material = .hudWindow
glass.blendingMode = .behindWindow
glass.state = .active
glass.appearance = NSAppearance(named: .vibrantDark)
card.addSubview(glass)

let tint = NSView(frame: card.bounds)
tint.autoresizingMask = [.width, .height]
tint.wantsLayer = true
tint.layer?.backgroundColor = NSColor(calibratedRed: 0.07, green: 0.075, blue: 0.10, alpha: 0.58).cgColor
card.addSubview(tint)

// the day's painting across the top, cropped to a band, with the weekday set over it like on the page
if let art = art {
    let pic = ArtView(frame: NSRect(x: 0, y: 0, width: width, height: band))
    pic.image = art
    card.addSubview(pic)
    let day = text(weekday, serif(22), .white)
    let shadow = NSShadow()
    shadow.shadowColor = NSColor(white: 0, alpha: 0.6)
    shadow.shadowBlurRadius = 6
    shadow.shadowOffset = NSSize(width: 0, height: -1)
    day.shadow = shadow
    day.sizeToFit()
    day.frame.origin = NSPoint(x: pad, y: band - day.frame.height - 8)
    card.addSubview(day)
    let when = caps(dateText, 9.5, NSColor(white: 1, alpha: 0.82))
    when.shadow = shadow
    when.sizeToFit()
    when.frame.origin = NSPoint(x: width - pad - when.frame.width, y: band - when.frame.height - 12)
    card.addSubview(when)
}

let dim = NSColor(white: 1, alpha: 0.52)
let icon = NSImageView()
icon.image = NSImage(contentsOfFile: iconPath)
icon.imageScaling = .scaleProportionallyUpOrDown
icon.wantsLayer = true
icon.layer?.cornerRadius = 4
icon.layer?.masksToBounds = true
icon.translatesAutoresizingMaskIntoConstraints = false
let kicker = caps(label, 10, NSColor(white: 1, alpha: 0.68))
let top = NSStackView(views: art == nil ? [icon, kicker, NSView(), caps([weekday, dateText].filter { !$0.isEmpty }.joined(separator: " · "), 9.5, dim)] : [icon, kicker, NSView()])
top.orientation = .horizontal
top.spacing = 7
let head = text(headline, serif(14.5), NSColor(white: 1, alpha: 0.95), lines: 3)
let foot = text(counts, NSFont.systemFont(ofSize: 11, weight: .regular), dim)
let col = NSStackView(views: counts.isEmpty ? [top, head] : [top, head, foot])
col.orientation = .vertical
col.alignment = .leading
col.spacing = 5
col.setCustomSpacing(7, after: top)
col.translatesAutoresizingMaskIntoConstraints = false
card.addSubview(col)

let textWidth = width - pad * 2
head.preferredMaxLayoutWidth = textWidth
NSLayoutConstraint.activate([
    icon.widthAnchor.constraint(equalToConstant: 16),
    icon.heightAnchor.constraint(equalToConstant: 16),
    col.leadingAnchor.constraint(equalTo: card.leadingAnchor, constant: pad),
    col.topAnchor.constraint(equalTo: card.topAnchor, constant: band + 11),
    col.widthAnchor.constraint(equalToConstant: textWidth),
    top.widthAnchor.constraint(equalTo: col.widthAnchor),
    head.widthAnchor.constraint(equalTo: col.widthAnchor),
])
card.layoutSubtreeIfNeeded()
let height = band + col.fittingSize.height + 24

// bottom-right of the screen the pointer is on, above the Dock
let mouse = NSEvent.mouseLocation
let screen = NSScreen.screens.first { NSMouseInRect(mouse, $0.frame, false) } ?? NSScreen.main ?? NSScreen.screens[0]
let vis = screen.visibleFrame
let rest = NSRect(x: vis.maxX - width - 18, y: vis.minY + 18, width: width, height: height)
panel.setFrame(rest.offsetBy(dx: 0, dy: -12), display: false)
card.frame = NSRect(x: 0, y: 0, width: width, height: height)
panel.contentView = card
card.layoutSubtreeIfNeeded()
// ALBA_TOAST_PNG=<file>: draw the card to an image and exit, to check the layout without showing it
if let out = ProcessInfo.processInfo.environment["ALBA_TOAST_PNG"], let rep = card.bitmapImageRepForCachingDisplay(in: card.bounds) {
    card.cacheDisplay(in: card.bounds, to: rep)
    try? rep.representation(using: .png, properties: [:])?.write(to: URL(fileURLWithPath: out))
    exit(0)
}
panel.alphaValue = 0
panel.orderFrontRegardless()

NSAnimationContext.runAnimationGroup { ctx in
    ctx.duration = 0.34
    ctx.timingFunction = CAMediaTimingFunction(name: .easeOut)
    panel.animator().alphaValue = 1
    panel.animator().setFrame(rest, display: true)
}

var hovering = false
var closing = false
func close() {
    if closing { return }
    closing = true
    NSAnimationContext.runAnimationGroup({ ctx in
        ctx.duration = 0.3
        panel.animator().alphaValue = 0
    }, completionHandler: { NSApp.terminate(nil) })
}
var remaining = seconds
let timer = Timer.scheduledTimer(withTimeInterval: 0.25, repeats: true) { _ in
    if !hovering { remaining -= 0.25 }
    if remaining <= 0 { close() }
}
RunLoop.main.add(timer, forMode: .common)
card.onHover = { hovering = $0; if !$0 { remaining = max(remaining, 2.5) } }
card.onClick = {
    if !openApp.isEmpty {
        let p = Process()
        p.executableURL = URL(fileURLWithPath: "/usr/bin/open")
        p.arguments = ["-a", openApp]
        try? p.run()
    }
    close()
}
app.run()
