#!/etc/profiles/per-user/jostal/bin/fish

function rebuild -d "Rebuild nixos"
  set -f rebuildAgs 0 # rebuild ags flag
  set -f commitMessage "Nixos rebuild"
  # set flags
  switch $argv[(count $argv)]
    case '-ags' # rebuild ags
      set -f rebuildAgs 1
    case '-m' # commit message
      set -f commitMessage $argv[(count $argv)+1]
  end

  if test $rebuildAgs -eq 1
    if ags -q
      echo "Quit AGS"
    end
  end
  
  git add .
  and git commit -m $commitMessage
  and nixos-rebuild switch

  if test $rebuildAgs -eq 1
    if ags
      echo "Starting AGS"
    end
  end
end

