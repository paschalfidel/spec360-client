/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import VisionMissionValues from '../components/VisionMissionValues';
import BrandPromise from '../components/BrandPromise';
import Contact from '../components/Contact';
import useHashScroll from "../hooks/useHashScroll";

const Home = () => {
    useHashScroll();

    return (
        <motion.div
        initial={{ opacity: 0}}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5}}
        >
            <Hero />
            <About />
            <Services />
            <VisionMissionValues />
            <BrandPromise />
            <Contact />
        </motion.div>
    );
};

export default Home;