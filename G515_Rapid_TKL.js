// SPDX-License-Identifier: MIT
// Copyright (c) 2026 Wentys
// Logitech G515 RAPID TKL, USB 046D:C363. See README.md for the tested layout.

// Device metadata and user controls

export function Name() { return "Logitech G515 Rapid TKL"; }
export function VendorId() { return 0x046D; }
export function ProductId() { return 0xC363; }
export function Publisher() { return "Wentys"; }
export function Documentation() { return "troubleshooting/logitech"; }
export function Size() { return [71, 23]; }
export function DeviceType() { return "keyboard"; }
export function Validate(endpoint) {
  return endpoint.interface === 2;
}
export function ImageUrl() {
  return "https://resource.logitechg.com/w_544%2Ch_466%2Car_7%3A6%2Cc_pad%2Cq_auto%2Cf_auto%2Cdpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g515-rapid-tkl-pdp/gallery/g515-rapid-tkl-midnight-black-top-angle-gallery-1-us.png";
}

export function ControllableParameters() {
  return [
    {
      property: "shutdownColor", group: "lighting", label: "Shutdown Color",
      min: "0", max: "360", type: "color", default: "#009bde"
    },
    {
      property: "LightingMode", group: "lighting", label: "Lighting Mode",
      type: "combobox", values: ["Canvas", "Forced"], default: "Canvas"
    },
    {
      property: "forcedColor", group: "lighting", label: "Forced Color",
      min: "0", max: "360", type: "color", default: "#009bde"
    }
  ];
}

// Keyboard layout
// Names, positions and IDs share the same index. IDs are HID++ lighting zones,
// not physical key order; sort copies by ID when constructing range packets.

var vLedNames = [
  "Esc",
  "F1", "F2", "F3", "F4",
  "F5", "F6", "F7", "F8",
  "F9", "F10", "F11", "F12",
  "PRNT", "LOCK", "P/B",
  "Grave", "1", "2", "3", "4", "5", "6",
  "7", "8", "9", "0", "Minus", "Equals", "Backspace",
  "Insert", "Home", "Page Up",
  "Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
  "Left Bracket", "Right Bracket", "Delete", "End", "Page Down",
  "Caps Lock", "A", "S", "D", "F", "G", "H", "J", "K", "L",
  "Semicolon", "Quote", "Backslash", "Enter",
  "Left Shift", "Z", "X", "C", "V", "B", "N", "M",
  "Comma", "Period", "Slash", "Right Shift", "Up",
  "Left Ctrl", "Win", "Left Alt", "Space", "Right Alt", "Fn",
  "Menu", "Right Ctrl", "Left", "Down", "Right"
];

var vLedPositions = [
  // Esc, F1–F12, PRNT, LOCK, P/B
  [0, 0],
  [8, 0], [12, 0], [16, 0], [20, 0],
  [26, 0], [30, 0], [34, 0], [38, 0],
  [44, 0], [48, 0], [52, 0], [56, 0],
  [62, 0], [66, 0], [70, 0],

  // Grave, 1–0, Minus, Equals, Backspace
  [0, 6], [4, 6], [8, 6], [12, 6], [16, 6],
  [20, 6], [24, 6], [28, 6], [32, 6], [36, 6],
  [40, 6], [44, 6], [48, 6], [54, 6],

  // Insert, Home, Page Up
  [62, 6], [66, 6], [70, 6],

  // Tab, Q–P, Left Bracket, Right Bracket
  [1, 10], [6, 10], [10, 10], [14, 10], [18, 10],
  [22, 10], [26, 10], [30, 10], [34, 10], [38, 10],
  [42, 10], [46, 10], [50, 10],

  // Delete, End, Page Down
  [62, 10], [66, 10], [70, 10],

  // Caps Lock, A–L, Semicolon, Quote, Backslash, Enter
  [2, 14], [7, 14], [11, 14], [15, 14], [19, 14],
  [23, 14], [27, 14], [31, 14], [35, 14], [39, 14],
  [43, 14], [47, 14], [51, 14], [57, 12],

  // Left Shift, Z–M, Comma, Period, Slash, Right Shift, Up
  [3, 18], [9, 18], [13, 18], [17, 18], [21, 18],
  [25, 18], [29, 18], [33, 18], [37, 18], [41, 18],
  [45, 18], [53, 18], [66, 18],

  // Left Ctrl, Win, Left Alt, Space, Right Alt, Fn,
  // Menu, Right Ctrl, Left, Down, Right
  [0, 22], [5, 22], [10, 22], [26, 22],
  [42, 22], [47, 22], [52, 22], [57, 22],
  [62, 22], [66, 22], [70, 22]
];

const keyIds = [
  0x26,
  0x37, 0x38, 0x39, 0x3A,
  0x3B, 0x3C, 0x3D, 0x3E,
  0x3F, 0x40, 0x41, 0x42,
  0x43, 0x44, 0x45, 0x32,
  0x1B, 0x1C, 0x1D, 0x1E, 0x1F, 0x20,
  0x21, 0x22, 0x23, 0x24, 0x2A, 0x2B, 0x27,
  0x46, 0x47, 0x48,
  0x28, 0x11, 0x17, 0x05, 0x12, 0x14, 0x19, 0x15,
  0x09, 0x0F, 0x10, 0x2C, 0x2D, 0x49, 0x4A, 0x4B,
  0x36, 0x01, 0x13, 0x04, 0x06, 0x07, 0x08,
  0x0A, 0x0B, 0x0C, 0x30, 0x31, 0x2F, 0x25,
  0x69, 0x1A, 0x18, 0x03, 0x16, 0x02, 0x0E,
  0x0D, 0x33, 0x34, 0x35, 0x6D, 0x4F,
  0x68, 0x6B, 0x6A, 0x29, 0x6E, 0x6F,
  0x62, 0x6C, 0x4D, 0x4E, 0x4C
];

export function LedNames() { return vLedNames; }
export function LedPositions() { return vLedPositions; }

// Protocol constants
// Feature indexes are specific to the tested firmware. Initialization was
// captured from G HUB; preserve the command order and payload bytes.

const MIN_FRAME_INTERVAL_MS = 50;
const ABSOLUTE_REFRESH_INTERVAL_MS = 2000;
const REPLY_TIMEOUT_MS = 20;
const ERROR_LOG_INTERVAL_MS = 2000;

const startupColorPacket = [
  0x11, 0xFF, 0x06, 0x1D, 0x00,
  0x01, 0x00, 0x00, 0x00, 0x02,
  0x00, 0x00, 0x00, 0x00, 0x00,
  0x00, 0x01, 0x00, 0x00, 0x00
];

const startupApplyPacket = [
  0x10, 0xFF, 0x0D, 0x1D,
  0x00, 0x00, 0x00
];

// State is reset on initialization and after uncertain HID++ transactions.
let previousColors = [];
let lastAbsoluteRefresh = 0;
let lastFrameStartedAt = 0;
let replySoftwareId = 0;
let lastReplyErrorLog = -2000;
let replyConfirmationLogged = false;

// SignalRGB lifecycle

export function Initialize() {
  previousColors = [];
  lastAbsoluteRefresh = 0;
  lastFrameStartedAt = 0;
  replySoftwareId = 0;
  lastReplyErrorLog = -2000;
  replyConfirmationLogged = false;

  const initCommands = [
    [0x10, 0xFF, 0x06, 0x8D, 0x00, 0x00, 0x00],
    [0x11, 0xFF, 0x06, 0x7D, 0x00, 0x00, 0x00,
     0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
     0x00, 0x00, 0x00, 0x00, 0x00, 0x00],
    [0x10, 0xFF, 0x06, 0x3D, 0x00, 0x00, 0x20],
    [0x10, 0xFF, 0x06, 0x5D, 0x00, 0x00, 0x00],
    [0x10, 0xFF, 0x06, 0x5D, 0x01, 0x03, 0x07],
    [0x10, 0xFF, 0x06, 0x8F, 0x01, 0x01, 0x00],
    [0x10, 0xFF, 0x06, 0x5D, 0x01, 0x03, 0x05]
  ];

  for (const cmd of initCommands) {
    const usage = cmd.length === 20 ? 0x0002 : 0x0001;

    device.set_endpoint(2, usage, 0xFF00);

    const result = device.write(cmd, cmd.length);
    if (result !== cmd.length) device.log(`Initialization write failed: ${cmd[3].toString(16)}`);
  }

  device.set_endpoint(2, 0x0002, 0xFF00);
  if (device.write(startupColorPacket, 20) !== 20) device.log("Initial color write failed");

  device.set_endpoint(2, 0x0001, 0xFF00);
  if (device.write(startupApplyPacket, 7) !== 7) device.log("Initial apply write failed");
}

export function Render() {
  const now = Date.now();
  // Avoid rapid repeated commits (Busy was observed in the diagnostic test).
  if (now - lastFrameStartedAt < MIN_FRAME_INTERVAL_MS) return;
  // Absolute frames establish the delta baseline and periodically resynchronize it.
  const fullRefresh = previousColors.length !== keyIds.length ||
    now - lastAbsoluteRefresh >= ABSOLUTE_REFRESH_INTERVAL_MS;
  let forced = typeof LightingMode !== 'undefined' && String(LightingMode) === 'Forced'
    ? hexToRgb(typeof forcedColor !== 'undefined' ? String(forcedColor) : '#009bde')
    : null;
  // Canvas already includes device brightness; apply it only to Forced RGB.
  if (forced) {
    const brightness = Number(device.getBrightness());
    const scale = isNaN(brightness) ? 1 : Math.max(0, Math.min(100, brightness)) / 100;
    forced = forced.map(channel => Math.round(channel * scale));
  }
  const keys = keyIds.map((id, index) => {
    const [x, y] = vLedPositions[index];
    const color = forced || device.color(x, y);
    const rgb = [color[0], color[1], color[2]];
    const previous = previousColors[index];
    return {
      id, index, rgb,
      changed: fullRefresh || !previous || rgb.some((v, c) => v !== previous[c]),
      delta: previous ? rgb.map((v, c) => v - previous[c]) : null
    };
  }).sort((a, b) => a.id - b.id);

  const changes = keys.filter(key => key.changed);
  if (changes.length === 0) return;
  const plain = absolutePackets(changes);
  const deltaPackets = [];
  const covered = new Set();

  if (!fullRefresh) {
    for (let i = 0; i + 8 <= keys.length;) {
      const block = keys.slice(i, i + 8);
      const valid = block.every((key, slot) =>
        key.id === block[0].id + slot && key.delta &&
        key.delta.every(d => d >= -16 && d <= 15));
      // At least five changed keys make this a candidate for saving packets.
      if (valid && block.filter(key => key.changed).length >= 5) {
        const deltas = [];
        for (const key of block) {
          for (const channelDelta of key.delta) {
            deltas.push(channelDelta);
          }
        }

        deltaPackets.push(packDelta5(block[0].id, deltas));
        block.forEach(key => covered.add(key.id));
        i += 8;
      } else {
        i++;
      }
    }
  }

  const mixed = deltaPackets.concat(absolutePackets(
    changes.filter(key => !covered.has(key.id))
  ));
  const useDelta = deltaPackets.length > 0 && mixed.length < plain.length;
  const packets = useDelta ? mixed : plain;
  if (!sendConfirmedLightingFrame(packets)) {
    previousColors = [];
    // Back off after a rejected or uncertain frame; never replay a delta blindly.
    lastFrameStartedAt = Date.now() + 50;
    return;
  }
  lastFrameStartedAt = now;
  // Advance the baseline only after all writes and the frame commit are acknowledged.
  for (const key of keys) previousColors[key.index] = key.rgb.slice();
  if (fullRefresh) lastAbsoluteRefresh = lastFrameStartedAt;
}

export function Shutdown() {
  const rgb = hexToRgb(typeof shutdownColor !== "undefined" ? String(shutdownColor) : "#000000");
  const keys = keyIds.map(id => ({id, rgb})).sort((a, b) => a.id - b.id);
  const packets = absolutePackets(keys);
  // Allow a recent frame to finish before applying the independent shutdown color.
  device.pause(50);
  if (!sendConfirmedLightingFrame(packets)) {
    // Absolute RGB can safely be resent; delta packets cannot.
    device.pause(50);
    if (!sendConfirmedLightingFrame(packets)) device.log("Shutdown color was not confirmed");
  }
  previousColors = [];
}

// Color conversion and packet construction

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return [0, 0, 0];
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
}

// Eight consecutive zones: signed 5-bit RGB deltas, MSB first.
// Input must contain exactly 24 deltas in [-16, 15].

function packDelta5(firstId, deltas) {
  const result = [0x11, 0xFF, 0x07, 0x3C, firstId];
  let value = 0;
  let bits = 0;
  for (const delta of deltas) {
    value = (value << 5) | (delta & 31);
    bits += 5;
    while (bits >= 8) {
      bits -= 8;
      result.push((value >>> bits) & 255);
      value &= (1 << bits) - 1;
    }
  }
  return result;
}

// Input is sorted by zone ID. Choose three range fills or four individual
// RGB values per report. Repeat the final valid entry to fill unused slots.

function absolutePackets(changes) {
  if (changes.length === 0) return [];
  const ranges = [];
  for (const change of changes) {
    const last = ranges[ranges.length - 1];
    if (last && change.id === last.end + 1 &&
        change.rgb.every((channel, c) => channel === last.rgb[c])) {
      last.end = change.id;
    } else {
      ranges.push({ start: change.id, end: change.id, rgb: change.rgb });
    }
  }
  const useRanges = Math.ceil(ranges.length / 3) < Math.ceil(changes.length / 4);
  const entries = useRanges ? ranges : changes;
  const count = useRanges ? 3 : 4;
  const packets = [];
  for (let start = 0; start < entries.length; start += count) {
    const packet = [0x11, 0xFF, 0x07, useRanges ? 0x5C : 0x1C];
    for (let slot = 0; slot < count; slot++) {
      const entry = entries[Math.min(start + slot, entries.length - 1)];
      if (useRanges) packet.push(entry.start, entry.end);
      else packet.push(entry.id);
      packet.push(...entry.rgb);
    }
    while (packet.length < 20) packet.push(0);
    packets.push(packet);
  }
  return packets;
}

// HID++ transport and reply validation

function logReplyError(message) {
  const now = Date.now();
  if (now - lastReplyErrorLog >= ERROR_LOG_INTERVAL_MS) {
    device.log(message);
    lastReplyErrorLog = now;
  }
}

function discardOldLightingReplies() {
  device.set_endpoint(2, 0x0002, 0xFF00);
  // Bounded non-blocking drain; unrelated input must never cause an endless loop.
  for (let i = 0; i < 128; i++) {
    device.read([], 20, 0);
    if (device.getLastReadSize() === 0) break;
  }
}

function sendConfirmedLightingReport(packet) {
  const outgoing = packet.slice();
  replySoftwareId = replySoftwareId % 15 + 1;
  // High nibble selects the function; low nibble tags its matching reply.
  outgoing[3] = (outgoing[3] & 0xF0) | replySoftwareId;
  if (device.write(outgoing, outgoing.length) !== outgoing.length) {
    logReplyError("RGB USB write failed; next frame will use absolute colors");
    return false;
  }
  const deadline = Date.now() + REPLY_TIMEOUT_MS;
  for (let attempt = 0; attempt < 32 && Date.now() <= deadline; attempt++) {
    const reply = device.read([], 20, 2);
    const length = device.getLastReadSize();
    if (length < 4 || reply[0] !== 0x11 || reply[1] !== 0xFF) continue;
    if (reply[2] === 0xFF && length >= 6 &&
        reply[3] === outgoing[2] && reply[4] === outgoing[3]) {
      const reason = reply[5] === 0x08 ? "Busy" : "error 0x" + reply[5].toString(16);
      logReplyError("RGB HID++ " + reason + "; next frame will use absolute colors");
      return false;
    }
    if (reply[2] === outgoing[2] && reply[3] === outgoing[3]) return true;
  }
  logReplyError("RGB reply timeout; next frame will use absolute colors");
  return false;
}

function sendConfirmedLightingFrame(packets) {
  discardOldLightingReplies();
  for (const packet of packets) {
    if (!sendConfirmedLightingReport(packet)) return false;
  }
  const apply = [0x11, 0xFF, 0x07, 0x7C, ...new Array(16).fill(0)];
  if (!sendConfirmedLightingReport(apply)) return false;
  if (!replyConfirmationLogged) {
    device.log("RGB HID++ replies confirmed");
    replyConfirmationLogged = true;
  }
  return true;
}

