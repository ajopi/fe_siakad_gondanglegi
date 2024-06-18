import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import EmailIcon from '@mui/icons-material/Email';

export const SidebarDataAdmin = [
    {
        title: "Aktivitas",
        icon: <LocalActivityIcon />,
        link: "/kelola-aktivitas-admin"
    },
    {
        title: "Kelola Data Guru",
        icon: <PersonAddIcon />,
        link: "/kelola-data-guru"
    },
    {
        title: "Kelola Data Siswa",
        icon: <PeopleIcon />,
        link: "/kelola-data-siswa"
    },
    {
        title: "Kelola Surat Guru",
        icon: <EmailIcon />,
        link: "/kelola-surat-guru"
    },

]