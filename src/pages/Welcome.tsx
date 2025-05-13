
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateEventUrl } from '../libs/helpers';

const Welcome = () => {
  const [registrationUrl, setRegistrationUrl] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorTxt, setErrorText] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // const eventId = registrationUrl.split('/').pop();
    const result = validateEventUrl(registrationUrl)
    if (!result.success) {
      setIsError(true);
      setErrorText(result.error!);
      return;
    }
    if (result.success) {
      navigate(`/${result.id!}`);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Event Registration
          </h1>
          <p className="text-xl text-gray-600">
            Quick and easy registration for your upcoming event
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-xl p-8 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-gray-800">Ready to Join?</h2>
            <p className="text-gray-600">Enter your event registration link below to secure your spot</p>
            
            <ul className="space-y-3 mt-4">
              <li className="flex items-center text-gray-600">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Simple Registration Process
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Instant Confirmation
              </li>
              <li className="flex items-center text-gray-600">
                <svg className="h-5 w-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Secure Registration
              </li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="registration-url" className="block text-sm font-medium text-gray-700">
                Your Event Registration Link
              </label>
              <div className="my-2">
                <input
                  type="text"
                  id="registration-url"
                  value={registrationUrl}
                  onChange={(e) => setRegistrationUrl(e.target.value)}
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 focus:outline-gray-400 block w-full sm:text-sm border border-gray-300 rounded-md py-2 px-2"
                  placeholder="Paste your event registration link here"
                  required
                />
              </div>
              {isError && <span className='text-xs text-red-600'>{errorTxt}</span>}
              <p className="mt-2 text-sm text-gray-500">This link was shared with you by the event organizer</p>
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              Register for Event
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500">
          Having trouble? Contact the event organizer for assistance
        </p>
      </div>
    </main>
  );
};

export default Welcome;
