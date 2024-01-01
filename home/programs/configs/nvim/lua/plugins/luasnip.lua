require("luasnip.loaders.from_vscode").lazy_load()
require("luasnip.loaders.from_lua").lazy_load()
require("luasnip").config.setup({
  history = true,
  region_check_events = "InsertEnter",
  delete_check_events = "TextChanged,InsertLeave"
})
