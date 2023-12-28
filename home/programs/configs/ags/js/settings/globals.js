
export async function globals() {
  try {
    globalThis.configDir = '/home/jostal/nixos-config/home/programs/configs/ags'
    globalThis.showControlCenter = false
  } catch (err) {
    console.error(err)
  }
}
