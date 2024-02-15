import { AuthorizationProvider } from "@/interfaces/enums/provider.enum";
import GoogleDriveIcon from '@/assets/images/services/icons8-google-drive-96.png';
import GmailIcon from '@/assets/images/services/icons8-gmail-96.png';
import GoogleSheetIcon from '@/assets/images/services/icons8-google-sheets-96.png';
import GoogleClassroomIcon from '@/assets/images/services/icons8-google-classroom-96.png';
import { StaticImageData } from "next/image";

export const providerData: {
  name: AuthorizationProvider;
  slug: string;
  icon: StaticImageData;
}[] = [
    {
      name: AuthorizationProvider.G_DRIVE,
      slug: 'drive',
      icon: GoogleDriveIcon,
    },
    {
      name: AuthorizationProvider.G_GMAIL,
      slug: 'gmail',
      icon: GmailIcon,
    },
    {
      name: AuthorizationProvider.G_SHEETS,
      slug: 'sheets',
      icon: GoogleSheetIcon,
    },
    {
      name: AuthorizationProvider.G_CLASSROOM,
      slug: 'classroom',
      icon: GoogleClassroomIcon,
    },
  ];