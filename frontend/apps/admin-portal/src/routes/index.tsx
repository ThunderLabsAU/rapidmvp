import { Button } from "@repo/ui-kit/components/core/button";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@repo/ui-kit/components/core/alert-dialog";
import { Input } from "@repo/ui-kit/components/core/input";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [isShowing, setIsShowing] = useState(false);
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
      <div>
        <Button variant="destructive" onClick={() => setIsShowing(!isShowing)}>
          Click me
        </Button>
        <Input />
        {isShowing && <div>Hello</div>}
        {isShowing && (
          <AlertDialog open={isShowing} onOpenChange={setIsShowing}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <Button
                  variant="destructive"
                  onClick={() => setIsShowing(false)}
                >
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}
