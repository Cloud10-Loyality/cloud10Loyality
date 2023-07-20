import React from "react";

type Props = {};

const loading = (props: Props) => {
  return (
    <div className="border border-muted shadow rounded-md p-4 max-w-sm w-full ml-0 mr-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-muted h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-muted rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-muted rounded col-span-2"></div>
              <div className="h-2 bg-muted rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
