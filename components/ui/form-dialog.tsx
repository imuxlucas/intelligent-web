import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './dialog';

interface FormDialogProps {
  trigger: React.ReactNode;
  title: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const FormDialog = ({ trigger, title, isOpen, onOpenChange, children }: FormDialogProps) => (
  <Dialog open={isOpen} onOpenChange={onOpenChange}>
    <DialogTrigger asChild>
      {trigger}
    </DialogTrigger>
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
);
