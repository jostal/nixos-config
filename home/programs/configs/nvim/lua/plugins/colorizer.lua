local M = {
  opts = {
    filetypes = { '*' },
    buftypes = { '*' },
    user_default_options = {
      RGB = true,
      RRGGBB = true,
      names = true,
      RRGGBBAA = true,
      AARRGGBB = true,
      rgb_fn = true,
      hsl_fn = true,
      css = true,
      css_fn = true,
      mode = "background",
      virtualtext = "■",
    },
    always_update = true
  }
}

return M
