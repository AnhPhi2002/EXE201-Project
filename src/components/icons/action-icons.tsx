import LockKeyholeIcon from "@/assets/icons/LockKeyhole";
import SearchIcon from "@/assets/icons/search";

type ActionIconsPropsType = {
  icon: 'lockkeyhole'
  | 'search';
};

const ActionIcons = ({ icon, ...props }: ActionIconsPropsType & React.HTMLAttributes<SVGSVGElement>) => {
  switch (icon) {
    case 'lockkeyhole': {
      return <LockKeyholeIcon {...props} />;
    }
  case 'search': {
    return <SearchIcon {...props} />;
  }
    default: {
      // Optionally, handle unmatched cases
      return null; // or throw an error if needed
    }
  }
};

export default ActionIcons;
