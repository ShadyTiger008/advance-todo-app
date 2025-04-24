"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export function FaqSection() {
  const faqs = [
    {
      question: "What is TaskFlow?",
      answer:
        "TaskFlow is a comprehensive task management and team collaboration platform designed to help teams organize work, track progress, and boost productivity. It combines powerful features with an intuitive interface to streamline your workflow.",
    },
    {
      question: "Is there a free plan available?",
      answer:
        "Yes, TaskFlow offers a free plan with essential features for individuals and small teams. We also offer premium plans with advanced features for growing teams and enterprises.",
    },
    {
      question: "How does TaskFlow handle team collaboration?",
      answer:
        "TaskFlow provides real-time collaboration features including shared workspaces, task assignments, comments, file sharing, and activity tracking. Team members can work together seamlessly regardless of their location.",
    },
    {
      question: "Can I integrate TaskFlow with other tools?",
      answer:
        "TaskFlow integrates with popular tools like Google Workspace, Microsoft Office, Slack, and many more. We also offer an API for custom integrations with your existing workflow.",
    },
    {
      question: "Is my data secure with TaskFlow?",
      answer:
        "Security is our top priority. TaskFlow uses enterprise-grade encryption, regular backups, and follows industry best practices for data protection. We're compliant with GDPR and other privacy regulations.",
    },
    {
      question: "How do I get started with TaskFlow?",
      answer:
        "Getting started is easy! Simply sign up for a free account, create your first workspace, and invite your team members. Our intuitive onboarding process will guide you through setting up your first project.",
    },
  ];

  return (
    <div className="bg-muted/30 py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Find answers to common questions about TaskFlow and how it can help
            your team.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-3xl"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </div>
  );
}
