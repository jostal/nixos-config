{ config, pkgs, ... }: {
	imports = [
		./common.nix	
		./alacritty.nix
		./neovim
		./fish
	];
}
