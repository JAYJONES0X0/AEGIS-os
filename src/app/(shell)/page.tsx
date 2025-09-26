import { redirect } from 'next/navigation';

// Root page - redirect to command centre
export default function RootPage() {
  redirect('/command-centre/today');
}