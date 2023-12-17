{ config, pkgs, ... }: {
	imports = [
		./common.nix	
		./alacritty.nix
		./fish
    ./neovim.nix
    ./tmux.nix
	];
}
