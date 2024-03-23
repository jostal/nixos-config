{
	description = "Jostal flake config";

	nixConfig = {
		experimental-features = [ "nix-command" "flakes" ];
		trusted-substituters = [
			"https://aseipp-nix-cache.global.ssl.fastly.net"
			"https://cache.nixos.org"
      "https://hyprland.cachix.org"
		];
    trusted-public-keys = [
      "hyprland.cachix.org-1:a7pgxzMz7+chwVL3/pzj6jIBMioiJM7ypFP8PwtkuGc="
      "cache.nixos.org-1:6NCHdD59X431o0gWypbMrAURkbJ16ZPMQFGspcDShjY="
    ];
	};

	# Inputs
	inputs = {
    hyprland.url = "github:hyprwm/Hyprland";
		nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
		home-manager = {
			url = "github:nix-community/home-manager/release-23.11";
			inputs.nixpkgs.follows = "nixpkgs";
		};

		ags.url = "github:Aylur/ags";

		sddm-sugar-candy-nix = {
			url = "gitlab:Zhaith-Izaliel/sddm-sugar-candy-nix";
			inputs.nixpkgs.follows = "nixpkgs";
		};
	};

	outputs = {
		self,
		nixpkgs,
		home-manager,
		sddm-sugar-candy-nix,
		...
		} @ inputs:
	{
		nixosConfigurations = {
			nixos = nixpkgs.lib.nixosSystem {
				system = "x86_64-linux";

				specialArgs = { inherit inputs; };
				modules = [
					./hosts/nixos

					sddm-sugar-candy-nix.nixosModules.default

					{
						nixpkgs = {
							overlays = [
								sddm-sugar-candy-nix.overlays.default
							];
						};
					}

					# Home manager
					home-manager.nixosModules.home-manager {
						home-manager.useGlobalPkgs = true;
						home-manager.useUserPackages = true;
						home-manager.extraSpecialArgs = { inherit inputs; };
						home-manager.users.jostal = import ./home;
					}
				];
			};
		};
	};

}
