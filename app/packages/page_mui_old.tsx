"use client"
import { useState } from "react"
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Chip,
    Divider,
    Dialog,
    DialogContent,
    DialogTitle,
    IconButton,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Stepper,
    Step,
    StepLabel,
    StepContent,
    Rating,
    DialogActions,
} from "@mui/material"
import {
    AccessTime,
    CalendarMonth,
    Check,
    Close,
    DirectionsCar,
    Groups,
    LocationOn,
    Luggage,
    Restaurant,
    SignalCellularAlt,
    Star,
    Thermostat,
    Visibility,
    WbSunny,
} from "@mui/icons-material"

// Package data structure for easy extension
const packages = [
    {
        id: "danakil-desert-safari",
        title: "Danakil Desert Safari",
        subtitle: "Explore the otherworldly landscapes of Ethiopia's Danakil Depression",
        description:
            "Journey through one of the hottest and most geologically active places on Earth. Witness colorful sulfur springs, salt flats, and the continuously active Erta Ale volcano on this unforgettable desert expedition.",
        image: "/packages/desert-safari/package-desert-safari.png?height=600&width=1200",
        duration: "4 days / 3 nights",
        groupSize: "4-12 travelers",
        difficulty: "Moderate",
        price: 899,
        location: "Danakil Depression, Afar Region",
        featured: true,
        highlights: [
            "Visit the colorful sulfur springs of Dallol",
            "Camp near the active Erta Ale volcano",
            "Experience the vast salt flats of Lake Asale",
            "Meet the Afar people and learn about their unique way of life",
            "Witness an otherworldly landscape unlike anywhere else on Earth",
        ],
        itinerary: [
            {
                day: 1,
                title: "Mekele to Hamed Ela",
                description:
                    "Early morning departure from Mekele. Drive through the dramatic landscapes of Tigray and into the Afar region. Visit the camel caravan salt miners at work. Overnight camping at Hamed Ela.",
                meals: ["lunch", "dinner"],
            },
            {
                day: 2,
                title: "Dallol Excursion",
                description:
                    "Morning visit to the colorful sulfur springs of Dallol, one of the most surreal landscapes on Earth. Explore the salt canyons and salt lakes. Return to Hamed Ela for lunch. Afternoon visit to Lake Asale salt flats. Overnight camping.",
                meals: ["breakfast", "lunch", "dinner"],
            },
            {
                day: 3,
                title: "Erta Ale Volcano",
                description:
                    "Morning drive to Dodom, the base of Erta Ale volcano. Late afternoon trek (3 hours) to the summit of Erta Ale. Witness the spectacular lava lake after sunset. Overnight camping on the crater rim.",
                meals: ["breakfast", "lunch", "dinner"],
            },
            {
                day: 4,
                title: "Return to Mekele",
                description:
                    "Early morning descent from Erta Ale. Drive back to Mekele, arriving in the late afternoon. End of tour services.",
                meals: ["breakfast", "lunch"],
            },
        ],
        included: [
            "All transportation in 4x4 vehicles",
            "English-speaking guide",
            "Local Afar guides and security",
            "Camping equipment (tents, mattresses)",
            "All meals as specified in the itinerary",
            "Entrance fees and permits",
            "Bottled water during the tour",
        ],
        excluded: [
            "International and domestic flights",
            "Alcoholic beverages",
            "Personal expenses and souvenirs",
            "Travel insurance (mandatory)",
            "Sleeping bag (can be rented for $15)",
            "Tips for guides and staff",
        ],
        departures: [
            { date: "Oct 15, 2023", availability: "Available", price: 899 },
            { date: "Nov 12, 2023", availability: "Limited", price: 899 },
            { date: "Dec 10, 2023", availability: "Available", price: 949 },
            { date: "Jan 14, 2024", availability: "Available", price: 949 },
            { date: "Feb 11, 2024", availability: "Full", price: 949 },
        ],
        faqs: [
            {
                question: "How physically demanding is this tour?",
                answer:
                    "This tour is rated as moderate. The most challenging part is the 3-hour hike to Erta Ale volcano, which is done at a slow pace. The extreme heat (often exceeding 40°C/104°F) makes the tour demanding, rather than the physical activity itself. We recommend this tour for reasonably fit travelers who can handle hot conditions.",
            },
            {
                question: "Is it safe to visit the Danakil Depression?",
                answer:
                    "We prioritize safety on all our tours. The Danakil region requires special permits and local Afar guides and security personnel, which we arrange. We follow established routes and maintain communication with local authorities. However, this is a remote area with extreme conditions, so travelers should be prepared for basic facilities and follow guide instructions at all times.",
            },
            {
                question: "What should I pack for this tour?",
                answer:
                    "Essential items include: lightweight, breathable clothing; sturdy walking shoes; wide-brimmed hat; high SPF sunscreen; sunglasses; personal medications; headlamp or flashlight; sleeping bag (can be rented); at least 2 liters water capacity; wet wipes; hand sanitizer; and a small backpack for the Erta Ale hike. A detailed packing list will be provided upon booking.",
            },
        ],
        reviews: [
            {
                name: "Michael T.",
                country: "United States",
                rating: 5,
                comment:
                    "One of the most incredible landscapes I've ever seen. The guides were knowledgeable and the organization was excellent despite the challenging environment. Standing at the edge of the Erta Ale volcano at night was a once-in-a-lifetime experience.",
            },
            {
                name: "Sophie L.",
                country: "France",
                rating: 4,
                comment:
                    "A truly unique adventure! The colorful formations at Dallol were unlike anything I've seen before. Be prepared for very basic conditions and extreme heat, but the experience is absolutely worth it.",
            },
        ],
    },
    // More packages can be added here in the future
]

export default function Packages() {
    // State for modal
    interface Package {
        id: string
        title: string
        subtitle: string
        description: string
        image: string
        duration: string
        groupSize: string
        difficulty: string
        price: number
        location: string
        featured: boolean
        highlights: string[]
        itinerary: {
            day: number
            title: string
            description: string
            meals: string[]
        }[]
        included: string[]
        excluded: string[]
        departures: {
            date: string
            availability: string
            price: number
        }[]
        faqs: {
            question: string
            answer: string
        }[]
        reviews: {
            name: string
            country: string
            rating: number
            comment: string
        }[]
    }

    const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [activeTab, setActiveTab] = useState(0)

    // Handle opening the modal with package details
    const handleOpenModal = (pkg: any) => {
        setSelectedPackage(pkg)
        setModalOpen(true)
        setActiveTab(0) // Reset tab when opening modal
    }

    // Handle closing the modal
    const handleCloseModal = () => {
        setModalOpen(false)
    }

    // Handle tab change in modal
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue)
    }

    return (
        <Box sx={{ bgcolor: "background.default", minHeight: "100vh", pb: 8 }}>
            {/* Hero Section */}
            <Box
                sx={{
                    position: "relative",
                    height: { xs: "50vh", md: "70vh" },
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 0,
                        "&::before": {
                            content: '""',
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            bgcolor: "rgba(0,0,0,0.5)",
                            zIndex: 1,
                        },
                    }}
                >
                    <Box
                        component="img"
                        src="/hero-section/hero-section.png?height=1080&width=1920"
                        alt="Desert Safari"
                        sx={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Box>

                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, color: "white", textAlign: "center" }}>
                    <Typography
                        variant="h1"
                        component="h1"
                        sx={{
                            fontWeight: "bold",
                            fontSize: { xs: "2.5rem", md: "4rem" },
                            mb: 2,
                            textShadow: "0 2px 4px rgba(0,0,0,0.5)",
                        }}
                    >
                        Travel Packages
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            maxWidth: "800px",
                            mx: "auto",
                            mb: 4,
                            textShadow: "0 1px 2px rgba(0,0,0,0.5)",
                        }}
                    >
                        Curated experiences that showcase the best of Ethiopia's diverse landscapes and cultures
                    </Typography>
                </Container>
            </Box>

            {/* Introduction Section */}
            <Container maxWidth="lg" sx={{ mt: 8, mb: 6 }}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                            Unforgettable Ethiopian Adventures
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Our carefully crafted travel packages offer immersive experiences in Ethiopia's most spectacular
                            destinations. From the otherworldly landscapes of the Danakil Depression to the ancient rock-hewn churches
                            of Lalibela, our expert guides will take you on journeys that combine adventure, culture, and comfort.
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Each package is designed to provide authentic experiences while ensuring your comfort and safety. With
                            small group sizes, expert local guides, and attention to every detail, you can focus on creating memories
                            that will last a lifetime.
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: 2,
                                height: "100%",
                            }}
                        >
                            
                            <Box
                                sx={{
                                    borderRadius: 2,
                                    overflow: "hidden",
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/packages/desert-safari/photo_5886525843839238829_y.jpg?height=600&width=400"
                                    alt="Ethiopia culture"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                            <Box
                                sx={{
                                    borderRadius: 2,
                                    overflow: "hidden",
                                }}
                            >
                                <Box
                                    component="img"
                                    src="/packages/desert-safari/photo_5886525843839238830_y.jpg?height=300&width=300"
                                    alt="Ethiopia wildlife"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                    }}
                                />
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Featured Packages Section */}
            <Box sx={{ bgcolor: "background.paper", py: 8 }}>
                <Container maxWidth="lg">
                    <Box sx={{ textAlign: "center", mb: 6 }}>
                        <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
                            Featured Packages
                        </Typography>
                        <Typography variant="h6" sx={{ maxWidth: 700, mx: "auto", color: "text.secondary" }}>
                            Discover our most popular travel experiences
                        </Typography>
                    </Box>

                    <Grid container spacing={4}>
                        {packages.map((pkg) => (
                            <Grid item xs={12} key={pkg.id}>
                                <Card
                                    sx={{
                                        display: "flex",
                                        flexDirection: { xs: "column", md: "row" },
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-8px)",
                                            boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                                        },
                                        overflow: "hidden",
                                        height: { md: 400 },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: { xs: "100%", md: "40%" },
                                            height: { xs: 240, md: "100%" },
                                            objectFit: "cover",
                                        }}
                                        image={pkg.image}
                                        alt={pkg.title}
                                    />
                                    <Box sx={{ display: "flex", flexDirection: "column", width: { md: "60%" } }}>
                                        <CardContent sx={{ flex: "1 0 auto", p: 1 }}>
                                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                                                <Box>
                                                    {pkg.featured && <Chip label="Featured" color="primary" size="small" sx={{ mb: 1 }} />}
                                                    <Typography component="h3" variant="h4" fontWeight="bold">
                                                        {pkg.title}
                                                    </Typography>
                                                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                                                        {pkg.subtitle}
                                                    </Typography>
                                                </Box>
                                                <Box sx={{ textAlign: "right" }}>
                                                    <Typography variant="h5" color="primary" fontWeight="bold">
                                                        ${pkg.price}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        per person
                                                    </Typography>
                                                </Box>
                                            </Box>

                                            <Typography variant="body1" paragraph>
                                                {pkg.description}
                                            </Typography>

                                            <Grid container spacing={2} sx={{ mt: 1 }}>
                                                <Grid item xs={12} sm={4}>
                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                        <AccessTime color="primary" sx={{ mr: 1, fontSize: 20 }} />
                                                        <Typography variant="body2">{pkg.duration}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                        <Groups color="primary" sx={{ mr: 1, fontSize: 20 }} />
                                                        <Typography variant="body2">{pkg.groupSize}</Typography>
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} sm={4}>
                                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                                        <SignalCellularAlt color="primary" sx={{ mr: 1, fontSize: 20 }} />
                                                        <Typography variant="body2">Difficulty: {pkg.difficulty}</Typography>
                                                    </Box>
                                                </Grid>
                                            </Grid>

                                            <Box sx={{ mt: 2 }}>
                                                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                                    Highlights:
                                                </Typography>
                                                <Grid container spacing={1}>
                                                    {pkg.highlights.slice(0, 4).map((highlight, index) => (
                                                        <Grid item xs={12} sm={6} key={index}>
                                                            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                                                                <Check color="primary" sx={{ mr: 1, mt: 0.3, fontSize: 18 }} />
                                                                <Typography variant="body2">{highlight}</Typography>
                                                            </Box>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Box>
                                        </CardContent>
                                        <Box sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            px: 4,
                                            pb: 3,
                                            justifyContent: "space-between", // Ensure space between location and button
                                            flexWrap: "wrap", // Allow wrapping on smaller screens
                                            gap: 2 // Add gap between elements when they wrap
                                        }}>
                                            <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                                                <LocationOn color="action" sx={{ mr: 0.5, fontSize: 18 }} />
                                                <Typography variant="body2" color="text.secondary">
                                                    {pkg.location}
                                                </Typography>
                                            </Box>
                                            <Box sx={{ flexGrow: 1 }} />
                                            <Button variant="contained" color="primary" size="large" onClick={() => handleOpenModal(pkg)}>
                                                View Details
                                            </Button>
                                        </Box>
                                    </Box>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Coming Soon Section */}
                    <Box sx={{ mt: 8, textAlign: "center" }}>
                        <Typography variant="h4" component="h3" gutterBottom fontWeight="bold">
                            More Packages Coming Soon
                        </Typography>
                        <Typography variant="body1" sx={{ maxWidth: 700, mx: "auto", mb: 4 }}>
                            We're constantly developing new and exciting travel experiences. Check back soon for more adventures
                            including the Simien Mountains Trek, Historical Northern Circuit, and Omo Valley Cultural Expedition.
                        </Typography>
                        {/* <Button variant="outlined" color="primary" size="large">
                            Notify Me of New Packages
                        </Button> */}
                    </Box>
                </Container>
            </Box>

            {/* Why Choose Our Packages */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Box sx={{ textAlign: "center", mb: 6 }}>
                    <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
                        Why Choose Our Packages
                    </Typography>
                    <Typography variant="h6" sx={{ maxWidth: 700, mx: "auto", color: "text.secondary" }}>
                        We create experiences that combine adventure, comfort, and authentic cultural connections
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {[
                        {
                            icon: Groups,
                            title: "Small Group Sizes",
                            description:
                                "With a maximum of 12 travelers per group, you'll enjoy personal attention and make meaningful connections.",
                        },
                        {
                            icon: Visibility,
                            title: "Unique Experiences",
                            description:
                                "Access off-the-beaten-path locations and enjoy activities not available to larger tour groups.",
                        },
                        {
                            icon: Restaurant,
                            title: "Authentic Cuisine",
                            description: "Taste the rich flavors of Ethiopian cuisine with carefully selected dining experiences.",
                        },
                        {
                            icon: Luggage,
                            title: "Hassle-Free Travel",
                            description:
                                "We handle all the logistics, permits, and arrangements so you can focus on enjoying your journey.",
                        },
                    ].map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        textAlign: "center",
                                        p: 3,
                                    }}
                                >
                                    <Box
                                        sx={{
                                            bgcolor: "primary.main",
                                            color: "white",
                                            borderRadius: "50%",
                                            p: 2,
                                            mb: 2,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Icon sx={{ fontSize: 32 }} />
                                    </Box>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        {feature.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {feature.description}
                                    </Typography>
                                </Box>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>

            {/* Call to Action */}
            <Box sx={{ bgcolor: "primary.main", color: "white", py: 8 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={8}>
                            <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
                                Ready to Experience Ethiopia?
                            </Typography>
                            <Typography variant="body1" paragraph>
                                Book your adventure today or contact us for a custom itinerary tailored to your interests and schedule.
                                Our travel experts are ready to help you plan the perfect Ethiopian journey.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={4} sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-end" } }}>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: "white",
                                    color: "primary.main",
                                    "&:hover": {
                                        bgcolor: "rgba(255,255,255,0.9)",
                                    },
                                    px: 4,
                                    py: 1.5,
                                }}
                            >
                                Book Now
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Package Details Modal */}
            <Dialog
                open={modalOpen}
                onClose={handleCloseModal}
                maxWidth="lg"
                fullWidth
                scroll="paper"
                aria-labelledby="package-details-title"
            >
                {selectedPackage && (
                    <>
                        <DialogTitle id="package-details-title" sx={{ pb: 1 }}>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <Typography variant="h5" component="h2" fontWeight="bold">
                                    {selectedPackage.title}
                                </Typography>
                                <IconButton edge="end" color="inherit" onClick={handleCloseModal} aria-label="close">
                                    <Close />
                                </IconButton>
                            </Box>
                        </DialogTitle>
                        <Divider />

                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs
                                value={activeTab}
                                onChange={handleTabChange}
                                variant="scrollable"
                                scrollButtons="auto"
                                aria-label="package details tabs"
                            >
                                <Tab label="Overview" />
                                <Tab label="Itinerary" />
                                {/* <Tab label="Dates & Pricing" /> */}
                                <Tab label="What to Expect" />
                                <Tab label="Reviews" />
                            </Tabs>
                        </Box>

                        <DialogContent dividers sx={{ p: 0 }}>
                            {/* Overview Tab */}
                            <Box role="tabpanel" hidden={activeTab !== 0} sx={{ p: 3 }}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={6}>
                                        <Box
                                            component="img"
                                            src={selectedPackage.image}
                                            alt={selectedPackage.title}
                                            sx={{
                                                width: "100%",
                                                height: "auto",
                                                borderRadius: 2,
                                                mb: 3,
                                            }}
                                        />
                                        <Typography variant="h6" gutterBottom fontWeight="bold">
                                            Package Highlights
                                        </Typography>
                                        <List disablePadding>
                                            {selectedPackage.highlights.map((highlight, index) => (
                                                <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                                        <Check color="primary" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={highlight} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="body1" paragraph>
                                            {selectedPackage.description}
                                        </Typography>

                                        <Box sx={{ mb: 3 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={6}>
                                                    <Paper sx={{ p: 2, bgcolor: "background.default" }}>
                                                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                                            <AccessTime color="primary" sx={{ mr: 1 }} />
                                                            <Typography variant="subtitle2" fontWeight="bold">
                                                                Duration
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="body2">{selectedPackage.duration}</Typography>
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Paper sx={{ p: 2, bgcolor: "background.default" }}>
                                                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                                            <Groups color="primary" sx={{ mr: 1 }} />
                                                            <Typography variant="subtitle2" fontWeight="bold">
                                                                Group Size
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="body2">{selectedPackage.groupSize}</Typography>
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Paper sx={{ p: 2, bgcolor: "background.default" }}>
                                                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                                            <SignalCellularAlt color="primary" sx={{ mr: 1 }} />
                                                            <Typography variant="subtitle2" fontWeight="bold">
                                                                Difficulty
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="body2">{selectedPackage.difficulty}</Typography>
                                                    </Paper>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Paper sx={{ p: 2, bgcolor: "background.default" }}>
                                                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                                            <Thermostat color="primary" sx={{ mr: 1 }} />
                                                            <Typography variant="subtitle2" fontWeight="bold">
                                                                Climate
                                                            </Typography>
                                                        </Box>
                                                        <Typography variant="body2">Hot & Arid</Typography>
                                                    </Paper>
                                                </Grid>
                                            </Grid>
                                        </Box>

                                        <Typography variant="h6" gutterBottom fontWeight="bold">
                                            What's Included
                                        </Typography>
                                        <List dense disablePadding sx={{ mb: 3 }}>
                                            {selectedPackage.included.map((item, index) => (
                                                <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                                        <Check color="primary" fontSize="small" />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item} />
                                                </ListItem>
                                            ))}
                                        </List>

                                        <Typography variant="h6" gutterBottom fontWeight="bold">
                                            What's Not Included
                                        </Typography>
                                        <List dense disablePadding>
                                            {selectedPackage.excluded.map((item, index) => (
                                                <ListItem key={index} disableGutters sx={{ py: 0.5 }}>
                                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                                        <Close fontSize="small" sx={{ color: "text.secondary" }} />
                                                    </ListItemIcon>
                                                    <ListItemText primary={item} />
                                                </ListItem>
                                            ))}
                                        </List>
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Itinerary Tab */}
                            <Box role="tabpanel" hidden={activeTab !== 1} sx={{ p: 3 }}>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                    Day-by-Day Itinerary
                                </Typography>
                                <Stepper orientation="vertical" sx={{ mt: 2 }}>
                                    {selectedPackage.itinerary.map((day) => (
                                        <Step key={day.day} active={true}>
                                            <StepLabel
                                                StepIconProps={{
                                                    sx: {
                                                        color: "primary.main",
                                                    },
                                                }}
                                            >
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    Day {day.day}: {day.title}
                                                </Typography>
                                            </StepLabel>
                                            <StepContent>
                                                <Typography variant="body2" paragraph>
                                                    {day.description}
                                                </Typography>
                                                <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
                                                    {day.meals.includes("breakfast") && (
                                                        <Chip
                                                            size="small"
                                                            label="Breakfast"
                                                            icon={<Restaurant sx={{ fontSize: 16 }} />}
                                                            sx={{ bgcolor: "rgba(25, 118, 210, 0.1)" }}
                                                        />
                                                    )}
                                                    {day.meals.includes("lunch") && (
                                                        <Chip
                                                            size="small"
                                                            label="Lunch"
                                                            icon={<Restaurant sx={{ fontSize: 16 }} />}
                                                            sx={{ bgcolor: "rgba(25, 118, 210, 0.1)" }}
                                                        />
                                                    )}
                                                    {day.meals.includes("dinner") && (
                                                        <Chip
                                                            size="small"
                                                            label="Dinner"
                                                            icon={<Restaurant sx={{ fontSize: 16 }} />}
                                                            sx={{ bgcolor: "rgba(25, 118, 210, 0.1)" }}
                                                        />
                                                    )}
                                                </Box>
                                            </StepContent>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Box>

                            {/* What to Expect Tab */}
                            <Box role="tabpanel" hidden={activeTab !== 2} sx={{ p: 3 }}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h6" gutterBottom fontWeight="bold">
                                            Frequently Asked Questions
                                        </Typography>
                                        {selectedPackage.faqs.map((faq, index) => (
                                            <Box key={index} sx={{ mb: 3 }}>
                                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                                    {faq.question}
                                                </Typography>
                                                <Typography variant="body2" paragraph>
                                                    {faq.answer}
                                                </Typography>
                                                {index < selectedPackage.faqs.length - 1 && <Divider sx={{ my: 2 }} />}
                                            </Box>
                                        ))}
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Typography variant="h6" gutterBottom fontWeight="bold">
                                            Weather & Climate
                                        </Typography>
                                        <Typography variant="body2" paragraph>
                                            The Danakil Depression is one of the hottest places on Earth, with daytime temperatures regularly
                                            exceeding 40°C (104°F) and sometimes reaching 50°C (122°F). Nights can be considerably cooler,
                                            especially at Erta Ale volcano which is at a higher elevation.
                                        </Typography>

                                        <Box sx={{ mb: 3 }}>
                                            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                                Average Temperatures:
                                            </Typography>
                                            <Grid container spacing={1}>
                                                {[
                                                    { month: "Oct-Nov", day: "35-45°C", night: "20-25°C", icon: WbSunny },
                                                    { month: "Dec-Feb", day: "30-40°C", night: "15-20°C", icon: WbSunny },
                                                ].map((season, index) => {
                                                    const Icon = season.icon
                                                    return (
                                                        <Grid item xs={6} key={index}>
                                                            <Paper sx={{ p: 2, bgcolor: "background.default" }}>
                                                                <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
                                                                    {season.month}
                                                                </Typography>
                                                                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                                                                    <Icon sx={{ mr: 1, color: "warning.main" }} />
                                                                    <Typography variant="body2">Day: {season.day}</Typography>
                                                                </Box>
                                                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                                                    <Icon sx={{ mr: 1, color: "info.main" }} />
                                                                    <Typography variant="body2">Night: {season.night}</Typography>
                                                                </Box>
                                                            </Paper>
                                                        </Grid>
                                                    )
                                                })}
                                            </Grid>
                                        </Box>

                                        <Typography variant="h6" gutterBottom fontWeight="bold">
                                            Transportation
                                        </Typography>
                                        <Typography variant="body2" paragraph>
                                            This tour uses specialized 4x4 vehicles equipped for desert conditions. The vehicles are
                                            air-conditioned when possible, but be prepared for periods without air conditioning due to the
                                            extreme conditions. The drive from Mekele to the Danakil region takes approximately 6-7 hours on
                                            rough roads.
                                        </Typography>
                                        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                            <DirectionsCar color="primary" sx={{ mr: 1 }} />
                                            <Typography variant="body2">4x4 Toyota Land Cruisers or equivalent</Typography>
                                        </Box>

                                        <Typography variant="h6" gutterBottom fontWeight="bold">
                                            Accommodation
                                        </Typography>
                                        <Typography variant="body2" paragraph>
                                            Accommodation on this tour is basic camping. At Hamed Ela, you'll stay in simple traditional Afar
                                            huts or tents. At Erta Ale volcano, you'll camp on the crater rim in tents. Bathroom facilities
                                            are very basic throughout the tour. This is a true adventure experience in a remote area.
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Box>

                            {/* Reviews Tab */}
                            <Box role="tabpanel" hidden={activeTab !== 3} sx={{ p: 3 }}>
                                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                                    <Box sx={{ mr: 2 }}>
                                        <Typography variant="h3" fontWeight="bold" color="primary.main">
                                            4.5
                                        </Typography>
                                        <Rating value={4.5} precision={0.5} readOnly />
                                        <Typography variant="body2" color="text.secondary">
                                            Based on {selectedPackage.reviews.length} reviews
                                        </Typography>
                                    </Box>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Button variant="outlined" startIcon={<Star />}>
                                        Write a Review
                                    </Button>
                                </Box>

                                <Divider sx={{ mb: 3 }} />

                                {selectedPackage.reviews.map((review, index) => (
                                    <Box key={index} sx={{ mb: 3 }}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {review.name}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {review.country}
                                                </Typography>
                                            </Box>
                                            <Rating value={review.rating} readOnly size="small" />
                                        </Box>
                                        <Typography variant="body2" paragraph>
                                            {review.comment}
                                        </Typography>
                                        {index < selectedPackage.reviews.length - 1 && <Divider sx={{ my: 3 }} />}
                                    </Box>
                                ))}
                            </Box>
                        </DialogContent>

                        <DialogActions sx={{ p: 2 }}>
                            <Button onClick={handleCloseModal}>Close</Button>
                            <Button variant="contained" color="primary">
                                Book This Package
                            </Button>
                        </DialogActions>
                    </>
                )}
            </Dialog>
        </Box>
    )
}
