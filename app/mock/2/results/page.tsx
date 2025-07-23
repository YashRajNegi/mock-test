import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Mock2ResultsPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="max-w-xl w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Mock 2 Test Completed</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-center mb-6">Thank you for completing the IBPS Mock 2 test! Your responses have been recorded.</p>
          <div className="flex justify-center">
            <Link href="/">
              <Button variant="default">Return to Dashboard</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 