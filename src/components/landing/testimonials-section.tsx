"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Card, CardContent } from "~/components/ui/card";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "~/components/ui/button";

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "TaskFlow has completely transformed how our team manages projects. The interface is intuitive, and the features are exactly what we needed.",
      author: "Sarah Johnson",
      role: "Product Manager at TechCorp",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "I've tried many task management tools, but TaskFlow stands out with its beautiful design and powerful features. It's become essential to our workflow.",
      author: "Michael Chen",
      role: "Design Lead at CreativeStudio",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
    {
      quote:
        "The team collaboration features in TaskFlow have improved our communication and productivity. It's like it was designed specifically for our needs.",
      author: "Emily Rodriguez",
      role: "Marketing Director at GrowthLabs",
      avatar: "/placeholder.svg?height=80&width=80",
      rating: 5,
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prevIndex) =>
        (prevIndex - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <div className="from-background to-muted/30 bg-gradient-to-b py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Loved by Teams Worldwide
          </h2>
          <p className="text-muted-foreground text-lg">
            See what our users have to say about how TaskFlow has improved their
            productivity.
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-4xl">
          <div className="text-primary/20 absolute -top-8 -left-8">
            <Quote className="h-24 w-24" />
          </div>

          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-card/50 border-none shadow-lg backdrop-blur-sm">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex">
                    {[...Array(testimonials[activeIndex].rating)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-yellow-500 text-yellow-500"
                        />
                      ),
                    )}
                  </div>

                  <p className="mb-8 text-xl italic md:text-2xl">
                    "{testimonials[activeIndex].quote}"
                  </p>

                  <Avatar className="border-background mb-4 h-16 w-16 border-4">
                    <AvatarImage
                      src={
                        testimonials[activeIndex].avatar || "/placeholder.svg"
                      }
                      alt={testimonials[activeIndex].author}
                    />
                    <AvatarFallback>
                      {testimonials[activeIndex].author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="text-lg font-bold">
                      {testimonials[activeIndex].author}
                    </h4>
                    <p className="text-muted-foreground">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="mt-8 flex justify-center gap-4">
            <Button variant="outline" size="icon" onClick={prevTestimonial}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {testimonials.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                className={`h-8 w-8 rounded-full p-0 ${
                  index === activeIndex
                    ? "bg-primary text-primary-foreground"
                    : ""
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {index + 1}
              </Button>
            ))}
            <Button variant="outline" size="icon" onClick={nextTestimonial}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
