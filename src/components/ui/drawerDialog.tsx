import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface BaseProps {
  children: React.ReactNode;
}

interface RootDrawerDialogProps extends BaseProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface DrawerDialogProps extends BaseProps {
  className?: string;
  asChild?: true;
}

const desktop = "(min-width: 768px)";

const DrawerDialog = ({ children, ...props }: RootDrawerDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const DrawerDialog = isDesktop ? Dialog : Drawer;

  return <DrawerDialog {...props}>{children}</DrawerDialog>;
};

const DrawerDialogTrigger = ({
  className,
  children,
  ...props
}: DrawerDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const DrawerDialogTrigger = isDesktop ? DialogTrigger : DrawerTrigger;

  return (
    <DrawerDialogTrigger className={className} {...props}>
      {children}
    </DrawerDialogTrigger>
  );
};

const DrawerDialogClose = ({
  className,
  children,
  ...props
}: DrawerDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const DrawerDialogClose = isDesktop ? DialogClose : DrawerClose;

  return (
    <DrawerDialogClose className={className} {...props}>
      {children}
    </DrawerDialogClose>
  );
};

const DrawerDialogContent = ({
  className,
  children,
  ...props
}: DrawerDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const DrawerDialogContent = isDesktop ? DialogContent : DrawerContent;

  return (
    <DrawerDialogContent className={className} {...props}>
      {children}
    </DrawerDialogContent>
  );
};

const DrawerDialogDescription = ({
  className,
  children,
  ...props
}: DrawerDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const DrawerDialogDescription = isDesktop
    ? DialogDescription
    : DrawerDescription;

  return (
    <DrawerDialogDescription className={className} {...props}>
      {children}
    </DrawerDialogDescription>
  );
};

const DrawerDialogHeader = ({
  className,
  children,
  ...props
}: DrawerDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const DrawerDialogHeader = isDesktop ? DialogHeader : DrawerHeader;

  return (
    <DrawerDialogHeader className={className} {...props}>
      {children}
    </DrawerDialogHeader>
  );
};

const DrawerDialogTitle = ({
  className,
  children,
  ...props
}: DrawerDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const DrawerDialogTitle = isDesktop ? DialogTitle : DrawerTitle;

  return (
    <DrawerDialogTitle className={className} {...props}>
      {children}
    </DrawerDialogTitle>
  );
};

const DrawerDialogBody = ({
  className,
  children,
  ...props
}: DrawerDialogProps) => {
  return (
    <div className={cn("px-4 md:px-0", className)} {...props}>
      {children}
    </div>
  );
};

const DrawerDialogFooter = ({
  className,
  children,
  ...props
}: DrawerDialogProps) => {
  const isDesktop = useMediaQuery(desktop);
  const DrawerDialogFooter = isDesktop ? DialogFooter : DrawerFooter;

  return (
    <DrawerDialogFooter className={className} {...props}>
      {children}
    </DrawerDialogFooter>
  );
};

export {
  DrawerDialog,
  DrawerDialogTrigger,
  DrawerDialogClose,
  DrawerDialogContent,
  DrawerDialogDescription,
  DrawerDialogHeader,
  DrawerDialogTitle,
  DrawerDialogBody,
  DrawerDialogFooter,
};
