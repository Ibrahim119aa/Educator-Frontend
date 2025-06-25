"use client";

import ScrollAnimation from "@/components/ScrollAnimation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const AboutUsPage = () => {
    const howWeHelp = [
        {
            title: "Assessment and Matching",
            content: "We begin by understanding the specific academic needs and learning goals of each student. Through a detailed assessment, we match students with experienced teachers who specialize in the required subjects and grade levels."
        },
        {
            title: "Personalized Learning Plans",
            content: "Our teachers develop personalized learning plans tailored to each student's strengths, weaknesses, and learning style. These plans ensure that the educational content is relevant, engaging, and aligned with the student's curriculum."
        },
        {
            title: "One-on-One Coaching Sessions",
            content: "We conduct in-home coaching sessions that provide focused attention and support. Our teachers work closely with students to clarify concepts, reinforce learning, and build confidence in tackling academic challenges."
        },
        {
            title: "Continuous Monitoring and Feedback",
            content: "Throughout the coaching journey, we monitor progress closely and provide regular feedback to students and their parents. Adjustments to learning plans are made as necessary to ensure ongoing improvement and achievement of academic goals."
        }
    ]

    return (
        <div>
            <h1 className="p-10 text-center font-bold text-3xl">About Us</h1>
            <div className="max-w-screen-lg mx-auto p-5 flex flex-wrap gap-2">
                <div className="flex-1 min-w-52 w-full">
                    <ScrollAnimation animationClass="slide-right">
                        <Image src="/img2.jpeg" className="rounded-md" width={500} height={500} alt="Who we are" />
                    </ScrollAnimation>
                </div>
                <Card className="flex-1 relative">
                    <ScrollAnimation animationClass="fade-up">
                        <CardHeader>
                            <CardTitle className="text-center">Who are we?</CardTitle>
                            <CardContent className="p-5">
                                At <strong>OEducators</strong>, we are dedicated to connecting students with highly qualified teachers who bring education directly to their doorstep. With a commitment to academic excellence and personalized learning, we strive to make education accessible and enriching for students at every school level.
                            </CardContent>
                        </CardHeader>
                    </ScrollAnimation>
                </Card>
            </div>
            <div className="max-w-screen-lg mx-auto p-5 flex flex-row-reverse flex-wrap gap-2">
                <div className="flex-1 min-w-52 w-full">
                    <ScrollAnimation animationClass="slide-left">
                        <Image src="/img8.jpeg" className="rounded-md" width={500} height={500} alt="Who we are" />
                    </ScrollAnimation>
                </div>
                <Card className="flex-1 relative">
                    <ScrollAnimation animationClass="fade-down">
                        <CardHeader>
                            <CardTitle className="text-center">What we do?</CardTitle>
                            <CardContent className="p-5">
                                We specialize in providing experienced teachers for in-home coaching classes across all school levels. Whether your child needs support with foundational subjects or seeks advanced tutoring in specific disciplines, our carefully selected educators tailor their approach to meet individual learning needs. By bringing quality education into the comfort of your home, we aim to foster a supportive environment where students can thrive academically and reach their full potential.
                            </CardContent>
                        </CardHeader>
                    </ScrollAnimation>
                </Card>
            </div>
            <div className="p-5 py-10">
                <div className="max-w-screen-lg mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-5">
                    {
                        howWeHelp.map((item, index) => (
                            <ScrollAnimation animationClass="slide-up" key={index}>
                                <Card className="border-b-4 shadow-md transition ease-in-out duration-500 hover:border-b-primary">
                                    <CardHeader>
                                        <CardTitle>{item.title}</CardTitle>
                                        <CardContent className="px-0 py-5 text-sm">{item.content}</CardContent>
                                    </CardHeader>
                                </Card>
                            </ScrollAnimation>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default AboutUsPage;