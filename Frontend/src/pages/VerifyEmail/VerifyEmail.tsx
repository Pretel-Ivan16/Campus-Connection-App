import { useParams } from 'react-router-dom';
import { useVerifyEmail } from '../../hooks/useVerifyEmail';
import FormHeader from '../../components/ui/FormHeader';
import VerifyEmailLoading from '../../components/ui/VerifyEmailLoading';
import VerifyEmailSuccess from '../../components/ui/VerifyEmailSuccess';
import VerifyEmailError from '../../components/ui/VerifyEmailError';

export default function VerifyEmail() {
  const { token } = useParams<{ token: string }>();
  const { status, message } = useVerifyEmail(token);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <FormHeader title="CampusConnect" subtitle="Verificación de Email" />

        {status === 'loading' && <VerifyEmailLoading message={message} />}
        {status === 'success' && <VerifyEmailSuccess message={message} />}
        {status === 'error' && <VerifyEmailError message={message} />}
      </div>
    </div>
  );
}
