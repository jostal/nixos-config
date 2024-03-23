{ config, pkgs, inputs, ... }: {

	xdg = {
		autostart.enable = true;
		portal = {
			enable = true;
			wlr.enable = true;
			extraPortals = with pkgs; [
				xdg-desktop-portal-gtk
				# xdg-desktop-portal-hyprland
			];
		};
	};

	programs.hyprland = {
		enable = true;
    package = inputs.hyprland.packages.${pkgs.system}.hyprland;
		xwayland.enable = true;
	};
}
