{ config, pkgs, ... }: {

	xdg = {
		autostart.enable = true;
		portal = {
			enable = true;
			wlr.enable = true;
			extraPortals = with pkgs; [
				xdg-desktop-portal-gtk
				xdg-desktop-portal-hyprland
			];
		};
	};

	programs.hyprland = {
		enable = true;
		xwayland.enable = true;
	};
}
