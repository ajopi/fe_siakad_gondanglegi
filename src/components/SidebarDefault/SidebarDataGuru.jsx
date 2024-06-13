import EmailIcon from '@mui/icons-material/Email';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';


export const SidebarDataGuru = [
    {
        title: "Permohonan Surat",
        icon: <EmailIcon />,
        link: "/permohonan-surat"
    },
    {
        title: "Jadwal Kegiatan Sekolah",
        icon: <LocalActivityIcon />,
        link: "/jadwal-sekolah"
    },
    {
        title: "Penilaian Mata Pelajaran",
        icon: <AssignmentIcon />,
        link: "/penilaian-guru"
    }
]