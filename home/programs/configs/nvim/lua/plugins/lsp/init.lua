config = function(_, opts)
    local utils = require("utils")
    local lspconfig = require("lspconfig")
    local lsp_utils = require("plugins.lsp.lsp-utils")
    lsp_utils.setup()
end
config()
