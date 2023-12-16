
export async function globals() {
  try {
    // globalThis.configDir = '/home/jostal/nixos-config/home/programs/configs/ags'
    globalThis.configDir = '/home/jostal/.config/ags'
  } catch (err) {
    console.error(err)
  }
}
