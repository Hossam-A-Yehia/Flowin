import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, FileText, Code, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Documentation',
  description: 'Learn how to use Flowin to build powerful automation workflows with our comprehensive documentation.',
};

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Documentation
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Learn how to build powerful automation workflows with Flowin
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Getting Started
                </CardTitle>
                <CardDescription>
                  Learn the basics of creating your first automation workflow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Step-by-step guide to get you up and running with Flowin in minutes.
                </p>
                <Button variant="outline" size="sm" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-violet-600" />
                  Workflow Builder
                </CardTitle>
                <CardDescription>
                  Master the visual workflow builder and its features
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Comprehensive guide to building complex automation workflows.
                </p>
                <Button variant="outline" size="sm" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-green-600" />
                  API Reference
                </CardTitle>
                <CardDescription>
                  Complete API documentation for developers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Detailed API reference with examples and authentication guides.
                </p>
                <Button variant="outline" size="sm" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-600" />
                  Integrations
                </CardTitle>
                <CardDescription>
                  Connect with your favorite tools and services
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Learn how to integrate Google Sheets, WhatsApp, Notion, and more.
                </p>
                <Button variant="outline" size="sm" disabled>
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Documentation Coming Soon
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  We're working hard to bring you comprehensive documentation. 
                  In the meantime, feel free to explore the platform or contact our support team.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button asChild>
                    <Link href="/dashboard">
                      Try Flowin
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="mailto:support@flowin.com">
                      Contact Support
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
