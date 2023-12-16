{ config, pkgs, ... }: {
	imports = [
		./common.nix	
		./alacritty.nix
		./fish
	];
}
