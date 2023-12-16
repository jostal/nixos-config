{ config, ... }:
let
  configDir = /home/jostal/nixos-config/home/programs/configs;
  symlink = config.lib.file.mkOutOfStoreSymlink;
in {
  xdg.configFile = {
    "ags".source = symlink "${configDir}/ags";
  };
}
