# Logitech G515 RAPID TKL for SignalRGB

Unofficial SignalRGB plugin for per-key RGB lighting on the wired Logitech G515 RAPID TKL. No firmware flashing is required.

## Compatibility

Tested on one G515 RAPID TKL with USB VID/PID **046D:C363**, using HID interface 2 and an 87-key layout with a tall Enter, long left Shift, and a backslash key beside Enter. Other layouts, firmware revisions, and G515 models have not been tested. HID++ feature indexes are currently fixed for the tested device.

## Features

- Individual Canvas lighting for all 87 keys.
- Forced Color mode for a single color across the keyboard.
- SignalRGB's built-in Device Brightness works in both modes.
- Configurable Shutdown Color; use `#000000` to turn lighting off on normal exit.
- Unchanged-color skipping, range fills, and 5-bit delta updates where they reduce traffic.
- HID++ reply matching, Busy/error detection, and absolute-color recovery after uncertain updates.
- USB reconnection and Windows sleep/resume tested successfully on the development setup.

## Installation

### Recommended: add this repository in SignalRGB

1. Open **SignalRGB → Settings → Plugins** and choose **Add Plugin Repository** (section wording may vary by version).
2. Add the repository URL:

   https://github.com/wentyss/signalrgb-logitech-g515-rapid-tkl

3. Enable the repository if prompted, let its plugins load, then reload plugins or restart SignalRGB.
4. Select the keyboard and choose **Lighting Mode → Canvas** or **Forced**.
5. If you keep G HUB open, follow the coexistence instructions below. Keep Windows Dynamic Lighting disabled for this keyboard.

When switching from manual installation, remove the old `G515_Rapid_TKL.js` from the user plugin directory first. Do not load both the manual and repository copies simultaneously.

### Alternative: manual installation

1. Download `G515_Rapid_TKL.js` from this repository's file page.
2. Copy it into your SignalRGB user plugin directory, normally `%USERPROFILE%\Documents\WhirlwindFX\Plugins`.
3. Restart SignalRGB if it does not reload the plugin automatically.

## Using G HUB alongside SignalRGB

The following configuration was tested on the development keyboard, including changing actuation settings in G HUB and resuming Windows from sleep:

1. In **Windows Settings → Personalization → Dynamic Lighting**, turn off Dynamic Lighting for this keyboard. If a per-device control is unavailable, turn off **Use Dynamic Lighting on my devices** globally.
2. In G HUB, select the keyboard and set **LIGHTSYNC → Presets → Off**. This is recommended to reduce colored flashes while SignalRGB starts or resumes. It does not guarantee removal of all startup or wake-up flicker: onboard lighting can appear before either application takes control. Then leave G HUB open to configure your keyboard and other Logitech devices.
3. If SignalRGB reports a conflict with **Logitech G HUB**, choose the option to **ignore that conflict** so SignalRGB continues controlling the keyboard.
4. Restart SignalRGB if it has already stopped controlling the keyboard, then select **Canvas** or **Forced** mode.
5. Confirm that lighting remains responsive while G HUB is open.

**Keep Windows Dynamic Lighting disabled.** Enabling it through G HUB's **WINDOWS SETTINGS** option and prioritizing SignalRGB in Windows initially appeared to work, but later caused lighting to freeze and update roughly once every ten seconds. Disabling Dynamic Lighting restored normal operation.

With Windows Dynamic Lighting disabled and the G HUB conflict ignored in SignalRGB, lighting remained active during G HUB use and after sleep/resume on the tested setup. Brief system-wide lighting flicker was observed during wake-up before SignalRGB finished initializing; persistent flicker or freezing afterward is not expected.

This is a result from one tested setup, not a guarantee across software or firmware versions. If lighting starts competing or freezing, fully exit G HUB, confirm Dynamic Lighting is disabled, and restart SignalRGB. After choosing Off, control lighting in SignalRGB and use G HUB for other settings. Further simultaneous changes to LIGHTSYNC were not validated.

## Controls

| Control | Behavior |
|---|---|
| Lighting Mode | Canvas effect or Forced Color |
| Forced Color | The color used in Forced mode |
| Device Brightness | Overall brightness in Canvas and Forced |
| Shutdown Color | Color applied on normal plugin shutdown, independent of Device Brightness |

The brightness control inside the Forced Color picker changes the selected color itself. Device Brightness then scales that color.

## Known limitations

Fast spatial gradients are limited by USB command throughput. Development measurements before the final reply-handling changes were approximately 9–10 FPS for a fast gradient, 14 FPS for a slower gradient using deltas, and 24 FPS for a shared-color effect. These are observations from specific effects, not guaranteed performance figures for the final version.

The plugin periodically refreshes absolute colors to limit state drift. It does not configure Rapid Trigger, actuation points, analog input, or keyboard macros. Shutdown Color cannot be guaranteed after a crash, power loss, or USB disconnection. The keyboard may briefly display its onboard profile before SignalRGB takes control.

## Troubleshooting and reports

`RGB HID++ replies confirmed` is logged once when a frame has been acknowledged. Repeated `Busy`, reply timeout, or write-error messages indicate a problem requiring investigation.

When opening an [issue](https://github.com/wentyss/signalrgb-logitech-g515-rapid-tkl/issues), include your SignalRGB version, firmware version if available, USB VID/PID, keyboard layout, reproduction steps, and relevant Device Console messages. Review screenshots and captures for personal information before sharing them.

## References

- [SignalRGB plugin documentation](https://docs.signalrgb.com/developer/plugins/)
- [OpenLogi PerKeyLighting implementation](https://github.com/AprilNEA/OpenLogi/blob/master/crates/openlogi-hidpp/src/feature/per_key_lighting.rs)
- [Delido Logitech plugin reference](https://github.com/Delido/signalrgb-plugins/blob/main/Logitech_Modern_Device.js)

The protocol was investigated using G HUB USB captures and device tests. The device thumbnail references Logitech's externally hosted product image and may show a different key layout. It is not included as a separately licensed repository asset.

This is a community project and is not affiliated with Logitech or SignalRGB.

## License

The plugin code and repository documentation are available under the [MIT License](LICENSE), copyright 2026 Wentys. Referenced third-party images and projects retain their own rights and licenses.


