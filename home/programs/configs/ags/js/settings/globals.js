
export async function globals() {
  try {
    globalThis.configDir = '/home/jostal/nixos-config/home/programs/configs/ags'
  } catch (err) {
    console.error(err)
  }
}
