import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Sparkles, Zap, Mail, Calendar, FileText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Workflow Templates',
  description: 'Discover pre-built workflow templates to automate your business processes with Flowin.',
};

const templates = [
  {
    id: 1,
    title: 'Lead Capture to CRM',
    description: 'Automatically add new leads from forms to your CRM system',
    category: 'Sales',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    tags: ['CRM', 'Forms', 'Automation']
  },
  {
    id: 2,
    title: 'Email to WhatsApp Notifications',
    description: 'Send WhatsApp messages when important emails arrive',
    category: 'Communication',
    icon: MessageSquare,
    color: 'text-green-600',
    bgColor: 'bg-green-50 dark:bg-green-900/20',
    tags: ['Email', 'WhatsApp', 'Notifications']
  },
  {
    id: 3,
    title: 'Google Sheets Data Sync',
    description: 'Keep your spreadsheets updated with real-time data',
    category: 'Data',
    icon: FileText,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50 dark:bg-violet-900/20',
    tags: ['Google Sheets', 'Sync', 'Data']
  },
  {
    id: 4,
    title: 'Meeting Scheduler',
    description: 'Automate meeting scheduling and calendar management',
    category: 'Productivity',
    icon: Calendar,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    tags: ['Calendar', 'Scheduling', 'Meetings']
  },
  {
    id: 5,
    title: 'Customer Support Workflow',
    description: 'Route support tickets and automate responses',
    category: 'Support',
    icon: Mail,
    color: 'text-pink-600',
    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
    tags: ['Support', 'Tickets', 'Automation']
  },
  {
    id: 6,
    title: 'Social Media Automation',
    description: 'Schedule and cross-post content across platforms',
    category: 'Marketing',
    icon: Sparkles,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50 dark:bg-cyan-900/20',
    tags: ['Social Media', 'Content', 'Marketing']
  }
];

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Workflow Templates
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Get started quickly with pre-built automation templates
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {templates.map((template) => {
              const Icon = template.icon;
              return (
                <Card key={template.id} className="hover:shadow-lg transition-shadow group">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className={`p-2 rounded-lg ${template.bgColor}`}>
                        <Icon className={`h-6 w-6 ${template.color}`} />
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {template.title}
                    </CardTitle>
                    <CardDescription>
                      {template.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {template.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="w-full" disabled>
                      <Zap className="mr-2 h-4 w-4" />
                      Use Template (Coming Soon)
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-blue-50 to-violet-50 dark:from-blue-900/20 dark:to-violet-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                  More Templates Coming Soon
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                  We're building a comprehensive library of workflow templates to help you automate 
                  every aspect of your business. Start creating your own workflows today!
                </p>
                <div className="flex gap-4 justify-center">
                  <Button asChild size="lg">
                    <Link href="/dashboard">
                      <Zap className="mr-2 h-5 w-5" />
                      Create Custom Workflow
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/auth/register">
                      Get Started Free
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
