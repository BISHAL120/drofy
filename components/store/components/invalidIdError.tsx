import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const InvalidIdError = ({name, link}: {name: string, link: string}) => {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center px-4 py-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Invalid {name} ID
          </h2>
          <p className="text-gray-500 mb-6">
            The provided {name} ID is not valid
          </p>
          <Button
            asChild
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Link href={link}>Go Back to</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InvalidIdError;
