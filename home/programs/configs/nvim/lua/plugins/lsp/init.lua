config = function()
  local utils = require("utils")
  local lspconfig = require("lspconfig")
  local lsp_utils = require("plugins.lsp.lsp-utils")
  lsp_utils.setup()

  -- Setup language servers
  lspconfig.tsserver.setup {
    on_attach = lsp_utils.on_attach,
    capabilities = lsp_utils.capabilities
  }
  lspconfig.nil_ls.setup {
    on_attach = lsp_utils.on_attach,
    capabilities = lsp_utils.capabilities
  }
  lspconfig.lua_ls.setup {
    on_init = function(client)
      local path = client.workspace_folders[1].name
      if not vim.loop.fs_stat(path .. '/.luarc.json') and not vim.loop.fs_stat(path .. '/.luarc.jsonc') then
        client.config.settings = vim.tbl_deep_extend('force', client.config.settings, {
          Lua = {
            runtime = {
              -- Tell the language server which version of Lua you're using
              -- (most likely LuaJIT in the case of Neovim)
              version = 'LuaJIT'
            },
            -- Make the server aware of Neovim runtime files
            workspace = {
              checkThirdParty = false,
              library = {
                vim.env.VIMRUNTIME
                -- "${3rd}/luv/library"
                -- "${3rd}/busted/library",
              }
              -- or pull in all of 'runtimepath'. NOTE: this is a lot slower
              -- library = vim.api.nvim_get_runtime_file("", true)
            }
          }
        })

        client.notify("workspace/didChangeConfiguration", { settings = client.config.settings })
      end
      return true
    end,
    on_attach = lsp_utils.on_attach,
    capabilities = lsp_utils.capabilities
  }
  lspconfig.rust_analyzer.setup {
    on_attach = lsp_utils.on_attach,
    capabilities = lsp_utils.capabilities,
    settings = {
      ['rust-analyzer'] = {
        diagnostics = {
          enable = true
        }
      }
    }
  }
  local capabilities = vim.lsp.protocol.make_client_capabilities()
  capabilities.textDocument.completion.completionItem.snippetSupport = true
  lspconfig.cssls.setup {
    capabilities = capabilities
  }
  lspconfig.eslint.setup({
    on_attach = function(client, bufnr)
      vim.api.nvim_create_autocmd("BufWritePre", {
        buffer = bufnr,
        command = "EslintFixAll",
      })
    end
  })
  lspconfig.svelte.setup {
    on_attach = lsp_utils.on_attach,
    capabilities = lsp_utils.capabilities
  }
  lspconfig.vimls.setup {
    on_attach = lsp_utils.on_attach,
    capabilities = lsp_utils.capabilities
  }
end

config()
