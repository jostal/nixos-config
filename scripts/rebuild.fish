#!/etc/profiles/per-user/jostal/bin/fish

function rebuild -d "Rebuild nixos"
  set -f rebuildAgs 0
  set -f commitMessage "Nixos rebuild"
  # set flags
  switch $argv[(count $argv)]
    case '-ags' # rebuild ags
      set -f rebuildAgs 1
    case '-m' # commit message
      set -f commitMessage $argv[(count $argv)+1]

  if test $rebuildAgs -eq 1
    ags -q
  end

  git add .
  git commit -m $commitMessage
  nixos-rebuild switch

  if test $rebuildAgs -eq 1
    ags
  end
end
