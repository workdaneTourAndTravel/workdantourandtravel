"use client"
import { Dialog, DialogContent } from "@mui/material"
import { useState, useEffect } from "react"
import { Container, Typography, Box, Grid, Card, CardContent, Paper, Chip, Divider } from "@mui/material"
import {
  Verified,
  Groups,
  Security,
  TravelExplore,
  Timeline,
  LocationOn,
  Star,
  Public, // replacing Eco with Public (globe-like icon)
  ShoppingBag,
} from "@mui/icons-material"
import { Clock } from "lucide-react"
import Image from "next/image"
import StoryTestimonial from "@/components/story-testimonial"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/autoplay"
import { Pagination, Autoplay } from 'swiper/modules';


export default function AboutPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<null | { image: string; title: string }>(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [aboutData, setAboutData] = useState(null)

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/about-pages?populate=*');
        const data = await response.json();
        setAboutData(data.data?.[0] || null);
      } catch (error) {
        console.error('Error fetching about data from Strapi:', error);
      }
    };

    fetchAboutData();
  }, []);

  const handleOpenCertificate = (cert: { image: string; title: string }) => {
    setSelectedCertificate(cert)
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setSelectedCertificate(null)
  }
  // Company statistics
  const stats = [
    { number: "500+", label: "Happy Travelers", icon: Groups },
    { number: "50+", label: "Destinations", icon: LocationOn },
    { number: "4", label: "Years Experience", icon: Timeline },
    { number: "4.9", label: "Average Rating", icon: Star },
  ]

  // Certificates data with image placeholders
  const certificates = aboutData?.certificates?.map((cert, index) => ({
    ...cert,
    image: index === 0 ? "/certificates/Apprtiaction Certificate-1.png?height=400&width=300&text=ETO+Certificate" : "/certificates/WORKDANE CHANNEL PARTNER_CERTFICATE_250227_153946-1.png?height=400&width=300&text=IATA+Certificate",
    icon: index === 0 ? Verified : TravelExplore,
  })) || [];

  const values = [
    {
      id: 0,
      title: 'Authentic Experiences',
      description:
        'We create genuine connections between travelers and local communities, ensuring every journey tells a unique story.',
      icon: Groups,
      color: '#1976d2',
    },
    {
      id: 1,
      title: 'Safety & Security',
      description:
        'Your safety is our top priority. We maintain the highest safety standards and provide 24/7 support throughout your journey.',
      icon: Security,
      color: '#d32f2f',
    },
    {
      id: 2,
      title: 'Sustainable Tourism',
      description:
        "We promote responsible travel that benefits local communities and preserves Ethiopia's natural and cultural heritage.",
      icon: Public, // new icon used here
      color: '#2e7d32',
    },
    {
      id: 3,
      title: 'Expert Guidance',
      description:
        "Our experienced local guides provide deep insights into Ethiopia's history, culture, and hidden treasures.",
      icon: TravelExplore,
      color: '#ed6c02',
    },
    {
      id: 4,
      title: 'Affordable',
      description:
        "We offer competitive rates and flexible packages to suit your budget and preferences.",
      icon: ShoppingBag,
      color: '#f59e0b',
    },
    {
      id: 5,
      title: 'Fast and Reliable',
      description:
        "We guarantee timely delivery and exceptional customer service to ensure a seamless travel experience.",
      icon: Clock,
      color: '#0ea5e9',
    }
  ]

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  if (!aboutData) {
    return <div>Loading...</div>; // Or a proper loading component
  }


  return (
    <Box sx={{ minHeight: "100vh" }}>
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
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              // background: "rgba(0, 0, 0, 0.7)", /* A dark, semi-transparent black */
              zIndex: 1,
            },
          }}
        >
          <Box
            component="img"
            src={`http://localhost:1337${aboutData.hero_cover?.url || "/about-us.jpg?height=1080&width=1920&text=Ethiopian+Landscape"}`}
            alt="About Werkdane tour and travel"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>

        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, color: "white", textAlign: "left" }}>
          {/* <Typography
            variant="h1"
            component="h1"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "3rem", md: "5rem" },
              mb: 2,
              textShadow: "0 4px 8px rgba(0,0,0,0.3)",
              background: "linear-gradient(135deg, rgba(65, 105, 225, 0.8) 0%, rgba(0, 0, 255, 0.9) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            About Us
          </Typography> */}
          <Typography
            variant="h4"
            sx={{
              maxWidth: "800px",
              mx: "auto",
              mb: 4,
              textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              fontWeight: 300,
            }}
          >

          </Typography>
          {/* <Box sx={{ display: "flex", justifyContent: "left", gap: 4, flexWrap: "wrap" }}>
            <Chip
              label="Licensed & Certified"
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: "bold",
                backdropFilter: "blur(10px)",
              }}
            />
            <Chip
              label="4+ Years Experience"
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: "bold",
                backdropFilter: "blur(10px)",
              }}
            />
            <Chip
              label="500+ Happy Travelers"
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                fontWeight: "bold",
                backdropFilter: "blur(10px)",
              }}
            />
          </Box> */}
        </Container>
      </Box>

      {/* Our Story Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Grid container alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography className="text-center" variant="h2" component="h2" gutterBottom fontWeight="bold" color="primary.main">
              Our Story
            </Typography>
            <Typography variant="h6" paragraph color="text.secondary" sx={{ mb: 4 }}>
            </Typography>
            {aboutData.story_text.split('\n\n').map((paragraph, index) => (
              <Typography key={index} className="text-center" variant="body1" paragraph sx={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
                {paragraph}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Container>
      {/* Core Values Section */}
      <section className="bg-white dark:bg-gray-900 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <Typography variant="h2" component="h2" gutterBottom fontWeight="bold" color="primary.main">Core Values We Offer</Typography>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              We believe travel is more than sightseeing, it's storytelling.
            </p>
          </div>

          <div className="space-y-12 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">
            {values.map((value, index) => (
              <div key={value.id} className="flex flex-col items-center md:items-start text-center md:text-left">
                <div className="flex justify-center items-center mb-4 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900">
                  <value.icon className="w-6 h-6 text-blue-600 dark:text-blue-300" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-blue-500">{value.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Certificates Section */}
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography variant="h2" component="h2" gutterBottom fontWeight="bold" color="primary.main">
            Our Certifications & Awards
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 700, mx: "auto", color: "text.secondary", mb: 4 }}>
            Recognized for our commitment to quality, safety, and professional excellence
          </Typography>
          <Divider sx={{ maxWidth: 200, mx: "auto", height: 4, bgcolor: "primary.main", borderRadius: 2 }} />
        </Box>

        <Grid container spacing={4}>
          {certificates.map((cert, index) => {
            const Icon = cert.icon
            return (
              <Grid item xs={12} sm={6} md={4} key={index} onClick={() => handleOpenCertificate({ image: cert.image, title: cert.title })} sx={{ cursor: "pointer" }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.4s ease",
                    border: "3px solid",
                    borderColor: "primary.main",
                    borderRadius: 3,
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-8px) scale(1.02)",
                      boxShadow: "0 20px 40px rgba(25, 118, 210, 0.2)",
                      borderColor: "secondary.main",
                    },
                  }}
                >
                  {/* Certificate Image */}
                  <Box
                    sx={{
                      position: "relative",
                      height: 200,
                      overflow: "hidden",
                      bgcolor: "grey.100",
                    }}
                  >
                    <Image
                      src={cert.image || "/placeholder.svg"}
                      alt={`${cert.title} Certificate`}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        bgcolor: "primary.main",
                        color: "white",
                        borderRadius: "50%",
                        p: 1,
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                      }}
                    >
                      <Icon sx={{ fontSize: 24 }} />
                    </Box>
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                        color: "white",
                        p: 2,
                      }}
                    >
                    </Box>
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                      <Chip label={cert.year} color="primary" size="small" sx={{ fontWeight: "bold" }} />
                      <Box sx={{ flexGrow: 1 }} />
                      <Verified sx={{ color: "success.main", fontSize: 20 }} />
                    </Box>

                    <Typography variant="h6" variant="h6" component="h3" gutterBottom fontWeight="bold" color="primary.main">
                      {cert.title}
                    </Typography>

                    <Typography variant="body1" color="text.secondary" paragraph sx={{ lineHeight: 1.6 }}>
                      {cert.description}
                    </Typography>

                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        bgcolor: "grey.50",
                        borderRadius: 2,
                        border: "1px solid",
                        borderColor: "grey.200",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        <strong>Certification Year:</strong> {cert.year}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {/* <strong>Certificate ID:</strong> {cert.certificateNumber} */}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            )
          })}
        </Grid>
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogContent sx={{ p: 0, position: "relative" }}>
            {selectedCertificate && (
              <>
                <Image
                  src={selectedCertificate.image}
                  alt={selectedCertificate.title}
                  width={800}
                  height={600}
                  style={{ width: "100%", height: "auto", objectFit: "contain" }}
                />
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Certificate Verification Note */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Paper
            elevation={2}
            sx={{
              p: 4,
              bgcolor: "primary.light",
              color: "white",
              borderRadius: 3,
              maxWidth: 800,
              mx: "auto",
            }}
          >
            <Verified sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h6" gutterBottom fontWeight="bold">
              All Certifications Verified
            </Typography>
            <Typography variant="body1">
              All our certifications and licenses are current and can be verified with the respective issuing
              authorities. We maintain the highest standards of compliance and regularly update our certifications to
              ensure we meet all industry requirements.
            </Typography>
          </Paper>
        </Box>
      </Container>
      <section id="stories" className="py-20">
        <div className="container">
          <div className="mb-12 text-center">
            <h2
              className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-blue-500"
              data-aos="fade-up"
            >
              Some stories from our clients
            </h2>

          </div>
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5000, // 5 seconds delay between slides
              disableOnInteraction: false, // Keeps autoplay running even after user interaction
            }}
            className="mySwiper"
          >
            <SwiperSlide>
              <StoryTestimonial
                name="Eliyas Birhanu"
                journey="Ethiopian Cultural Experience"
                quote="The experience was truly unforgettable. The guide was knowledgeable and the organization was excellent despite the challenging environment. Standing at the edge of the Erta Ale volcano at night was a once-in-a-lifetime experience."
                imageSrc="/placeholder.svg?height=100&width=100"
              />
            </SwiperSlide>
            <SwiperSlide>
              <StoryTestimonial
                name="Meaza Abebe"
                journey="Ethiopian Cultural Experience"
                quote="The experience was truly unforgettable. The guide was knowledgeable and the organization was excellent despite the challenging environment. Standing at the edge of the Erta Ale volcano at night was a once-in-a-lifetime experience."
                imageSrc="/placeholder.svg?height=100&width=100"
              />
            </SwiperSlide>
            {/* Add more SwiperSlide components for additional testimonials */}

          </Swiper>
        </div>
      </section>
      {/* Contact CTA Section */}
      {/* <Box
        sx={{
          background: "linear-gradient(135deg, rgba(65, 105, 225, 0.8) 0%, rgba(0, 0, 255, 0.9) 100%)",
          color: "white",
          py: 10,
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h2" component="h2" gutterBottom fontWeight="bold">
              If you have any questions or need assistance, please contact us.
            </Typography>

            <Grid container spacing={4} justifyContent="center" sx={{ mb: 4 }}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                  <Phone sx={{ mr: 1, fontSize: 24 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Call Us
                  </Typography>
                </Box>
                <Typography variant="body1">+251 906700007</Typography>
                <Typography variant="body1">+251 911625035</Typography>
                <Typography variant="body1">+251 906665577</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                  <Email sx={{ mr: 1, fontSize: 24 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Email Us
                  </Typography>
                </Box>
                <Typography variant="body1">
                  workdaneuae@gmail.com
              </Typography>
                <Typography variant="body1">workdantrading@gmail.com</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
                  <LocationOn sx={{ mr: 1, fontSize: 24 }} />
                  <Typography variant="h6" fontWeight="bold">
                    Visit Us
                  </Typography>
                </Box>
                <Typography variant="body1">Megenagna Wach Bldg. 2nd Floor, </Typography>
                <Typography variant="body1">1000 ADDIS ABABA, Ethiopia</Typography>
                <Typography variant="body1">United Arab Emirates, Sharjah Business center, Ground Floor</Typography>
              </Grid>
            </Grid>

            <Box sx={{ display: "flex", display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
              <Chip
                label="Licensed & Insured"
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: "bold",
                  backdropFilter: "blur(10px)",
                }}
              />
              <Chip
                label="24/7 Support"
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: "bold",
                  backdropFilter: "blur(10px)",
                }}
              />
              <Chip
                label="Best Price Guarantee"
                sx={{
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                  fontWeight: "bold",
                  backdropFilter: "blur(10px)",
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box> */}
    </Box>
  )
}