local colors = {
  fg1    = '#282828',
  color2 = '#504945',
  fg2    = '#ddc7a1',
  color3 = '#32302f',
  color4 = '#e78a4e',
  color5 = '#7daea3',
  color6 = '#a9b665',
  color7 = '#d8a657',
  color8 = '#d3869b',
  color9 = '#ea6962',
}

return {
  normal = {
    a = { fg = colors.fg1, bg = colors.color5, gui = 'bold' },
    b = { fg = colors.fg2, bg = colors.color2 },
    c = { fg = colors.fg2, bg = colors.fg1 },
  },
  command = { a = { fg = colors.fg1, bg = colors.color5, gui = 'bold' } },
  inactive = { a = { fg = colors.fg2, bg = colors.color2 } },
  insert = { a = { fg = colors.fg1, bg = colors.color6, gui = 'bold' } },
  replace = { a = { fg = colors.fg1, bg = colors.color7, gui = 'bold' } },
  terminal = { a = { fg = colors.fg1, bg = colors.color8, gui = 'bold' } },
  visual = { a = { fg = colors.fg1, bg = colors.color9, gui = 'bold' } },
}
