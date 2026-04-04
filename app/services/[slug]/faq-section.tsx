"use client"

import React, { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQ {
  question: string
  answer: string
}

interface FAQItem extends FAQ {
  isOpen: boolean
}

interface FAQSectionProps {
  faqs: FAQ[]
}

export function FAQSection({ faqs }: FAQSectionProps) {
  const [faqItems, setFaqItems] = useState<FAQItem[]>(
    faqs.map(faq => ({ ...faq, isOpen: false }))
  )

  const toggleFAQ = (index: number) => {
    setFaqItems((prev) =>
      prev.map((item, i) => (i === index ? { ...item, isOpen: !item.isOpen } : item))
    )
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Find answers to common questions about this experience
        </p>
        <div className="space-y-3">
          {faqItems.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-xl overflow-hidden transition-all duration-200 ${
                faq.isOpen ? 'border-blue-200 shadow-sm bg-blue-50/30' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between transition-colors"
                aria-expanded={faq.isOpen}
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <div className={`flex-shrink-0 p-1 rounded-full transition-colors ${faq.isOpen ? 'bg-blue-100' : 'bg-gray-100'}`}>
                  {faq.isOpen ? (
                    <ChevronUp className="w-4 h-4 text-blue-600" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  )}
                </div>
              </button>
              {faq.isOpen && (
                <div className="px-6 pb-5">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
