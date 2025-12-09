import { useState } from 'react';
import { Users, Lock, Mail, Eye, EyeOff, User, Phone, Building } from 'lucide-react';
import { use } from 'react';
import signupservice from '../Auth/services';
import { useEffect } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [regnumber , setregnumber] = useState('');
  
  // LOGIN VALIDATION ERRORS - ADD THIS
  const [loginErrors, setLoginErrors] = useState({});
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  




  // Signup state here sign up is a javascript object named signupData
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'teacher'
  });



  // SIGNUP VALIDATION ERRORS - ADD THIS
  const [signupErrors, setSignupErrors] = useState({});



  // ======================== FRONTEND VALIDATION FUNCTIONS - ADD THESE ========================



  // VALIDATE LOGIN FORM
  const validateLoginForm = () => {

    const errors = {};

    // CHECK: Email or Registration Number is required
    if (loginEmail.trim() === '' && regnumber.trim() === '') {
      errors.email = 'Please enter email OR registration number';
    }


    // CHECK: Email format validation (if email is provided)
    if (loginEmail.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(loginEmail)) {
        errors.email = 'Invalid email format (example: user@domain.com)';
      }
    }

    // CHECK: Registration Number is numeric (if provided)
    if (regnumber.trim() !== '') {
      if (!/^\d+$/.test(regnumber)) {
        errors.regnumber = 'Registration number must contain only digits';
      }
      if (regnumber.length < 3) {
        errors.regnumber = 'Registration number must be at least 3 digits';
      }
    }

    // CHECK: Password is not empty
    if (loginPassword.trim() === '') {
      errors.password = 'Password is required';
    }

    // CHECK: Password minimum length
    if (loginPassword.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    return errors;

  };

  // VALIDATE SIGNUP FORM
  const validateSignupForm = () => {
    const errors = {};

    // CHECK: Full Name - not empty and no special characters
    if (signupData.fullName.trim() === '') {
      errors.fullName = 'Full name is required';
    }
    if (signupData.fullName.length > 50) {
      errors.fullName = 'Full name must be less than 50 characters';
    }
    if (!/^[a-zA-Z\s]+$/.test(signupData.fullName)) {
      errors.fullName = 'Full name can only contain letters and spaces';
    }

    // CHECK: Email format
    if (signupData.email.trim() === '') {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signupData.email)) {
        errors.email = 'Invalid email format (example: user@example.com)';
      }
    }

    // CHECK: Phone - numeric and valid length
    if (signupData.phone.trim() === '') {
      errors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(signupData.phone)) {
      errors.phone = 'Phone must be exactly 10 digits';
    }



    // CHECK: Password - minimum 8 chars, uppercase, number, special char
    if (signupData.password === '') {
      errors.password = 'Password is required';
    } else if (signupData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    } else if (!/[A-Z]/.test(signupData.password)) {
      errors.password = 'Password must contain at least one uppercase letter';
    } else if (!/[0-9]/.test(signupData.password)) {
      errors.password = 'Password must contain at least one number';
    } else if (!/[!@#$%^&*]/.test(signupData.password)) {
      errors.password = 'Password must contain at least one special character (!@#$%^&*)';
    }



    // CHECK: Confirm Password matches Password
    if (signupData.confirmPassword === '') {
      errors.confirmPassword = 'Please confirm your password';
    } else if (signupData.password !== signupData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }


    // CHECK: Terms accepted (you'll need to add a state for this checkbox)
    // TODO: Add terms checkbox state and validate it here

    return errors;

  };



  // ======================== END VALIDATION FUNCTIONS ========================
  const handleLogin = () => {
    // ADD THIS: Validate before submitting
    const errors = validateLoginForm();
    setLoginErrors(errors);

    // If there are errors, don't proceed
    if (Object.keys(errors).length > 0) {
      console.log('Login validation failed:', errors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      console.log('Logging in...', { loginEmail, loginPassword });
      setIsLoading(false);
    }, 1500);
  };



  const handleSignup =  async () => {
    // ADD THIS: Validate before submitting
    const errors = validateSignupForm();
    setSignupErrors(errors);


    // If there are errors, don't proceed
    if (Object.keys(errors).length > 0) {
      console.log('Signup validation failed:', errors);
      return;
    }

    try{
      
        const res =   await signupservice(signupData);
        if(!res){
          console.log("Signup Failed");
          alert("Signup Failed");
        }

        console.log(res);

        
        if(res){
          alert("Signup Successfull");
          setSignupData({
            fullName: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            role: 'teacher'
          })
          setSignupErrors({});
        }

    } catch(error){
      console.log(error);
    }
  };



  const updateSignupData = (field, value) => {
    setSignupData(prev => ({ ...prev, [field]: value }));
    // CLEAR ERROR when user starts typing
    if (signupErrors[field]) {
      setSignupErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  // CLEAR LOGIN ERRORS when user types
  const handleLoginEmailChange = (e) => {
    setLoginEmail(e.target.value);
    if (loginErrors.email) {
      setLoginErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const handleLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value);
    if (loginErrors.password) {
      setLoginErrors(prev => ({ ...prev, password: '' }));
    }
  };

  const handleRegNumberChange = (e) => {
    setregnumber(e.target.value);
    if (loginErrors.regnumber) {
      setLoginErrors(prev => ({ ...prev, regnumber: '' }));
    }
  };




  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-gray-50 p-4 py-8">
      <div className="w-full max-w-md">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black rounded-lg flex items-center justify-center">
              <Users className="text-white" size={28} />
            </div>
            <h1 
              className="text-4xl sm:text-6xl font-bold text-white"
              style={{
                WebkitTextStroke: "1px black",
                textStroke: "1px black",
              }}
            >
              {isLogin ? 'Welcome to' : 'Join'}
            </h1>
          </div>
          <div className="inline-block bg-black px-6 py-3 rounded-lg">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
            Mark It
            </h2>
          </div>
          <p className="text-gray-600 mt-4 text-sm sm:text-base">
            {isLogin ? 'Sign in to manage your attendance system' : 'Create an account to get started'}
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 sm:p-8">
          {/* Toggle Tabs */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-md font-semibold transition-all ${
                isLogin 
                  ? 'bg-black text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-md font-semibold transition-all ${
                !isLogin 
                  ? 'bg-black text-white shadow-sm' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign Up
            </button>
          </div>



          {/* LOGIN FORM */}
          {isLogin ? (

            <div className="space-y-5">
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={loginEmail}
                    disabled={regnumber.length>0?true:false}
                    onChange={handleLoginEmailChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      loginErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {/* SHOW ERROR MESSAGE */}
                {loginErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{loginErrors.email}</p>
                )}
              </div>


                 <div className='either font-bold text-2xl text-black  flex flex-row items-center justify-center mt-4'>
                    <h2>OR</h2>
                    </div>

              <div>
               <label className='block text-sm font semibold text-gray-700 mb-2'>
                Registration Nubmber 
               </label>
                <div className='relative'>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <User size={18} className="text-gray-400" />
                  </div>
                    <input
                    type="text"
                    value={regnumber}
                    disabled={loginEmail.length>0?true:false}
                    onChange={handleRegNumberChange}
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      loginErrors.regnumber ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                    }`}
                    placeholder="Enter your registration number"
                  />
                </div>
                {/* SHOW ERROR MESSAGE */}
                {loginErrors.regnumber && (
                  <p className="text-red-500 text-xs mt-1">{loginErrors.regnumber}</p>
                )}
               </div>


              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={handleLoginPasswordChange}
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      loginErrors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                    }`}
                    placeholder="Enter your password"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff size={18} className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                {/* SHOW ERROR MESSAGE */}
                {loginErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{loginErrors.password}</p>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </button>
              </div>

              {/* Login Button */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className="w-full py-3 bg-black text-white font-bold text-lg rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
          ) : 
           // if form is of signup then show this form .
          
          (
            /* SIGNUP FORM */
            <div className="space-y-4">
              {/* Full Name Input */}
              <div className="space-y-4">

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={signupData.role}
                    onChange={(e) => updateSignupData('role', e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                  >
                    <option value="teacher">Teacher</option>
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>


                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={signupData.fullName}
                    onChange={(e) => updateSignupData('fullName', e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      signupErrors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                {/* SHOW ERROR MESSAGE */}
                {signupErrors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{signupErrors.fullName}</p>
                )}
              </div>

            
             

              {/* Phone & Institution Row */}   {/* Email Input */}
              <div className="grid grid-cols-2 gap-3">

                 <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail size={18} className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={signupData.email}
                    onChange={(e) => updateSignupData('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                      signupErrors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                    }`}
                    placeholder="john@example.com"
                  />
                </div>
                {/* SHOW ERROR MESSAGE */}
                {signupErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{signupErrors.email}</p>
                )}
               </div>



                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={18} className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      value={signupData.phone}
                      onChange={(e) => updateSignupData('phone', e.target.value)}
                      className={`w-full pl-10 pr-2 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                        signupErrors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                      }`}
                      placeholder="1234567890"
                    />
                  </div>
                  {/* SHOW ERROR MESSAGE */}
                  {signupErrors.phone && (
                    <p className="text-red-500 text-xs mt-1">{signupErrors.phone}</p>
                  )}
                </div>

             
              </div>

              {/* Password Inputs */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={signupData.password}
                      onChange={(e) => updateSignupData('password', e.target.value)}
                      className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                        signupErrors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                      }`}
                      placeholder="••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-2 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff size={16} className="text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye size={16} className="text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {/* SHOW ERROR MESSAGE */}
                  {signupErrors.password && (
                    <p className="text-red-500 text-xs mt-1">{signupErrors.password}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock size={18} className="text-gray-400" />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={signupData.confirmPassword}
                      onChange={(e) => updateSignupData('confirmPassword', e.target.value)}
                      className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
                        signupErrors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-200 focus:ring-blue-500'
                      }`}
                      placeholder="••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-2 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={16} className="text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye size={16} className="text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {/* SHOW ERROR MESSAGE */}
                  {signupErrors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{signupErrors.confirmPassword}</p>
                  )}
                </div>
              </div>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-2 cursor-pointer text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 mt-0.5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-600">
                  I agree to the{' '}
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button className="text-blue-600 hover:text-blue-700 font-medium">
                    Privacy Policy
                  </button>
                </span>
              </label>

              {/* Signup Button */}
              <button
                onClick={handleSignup}
                disabled={isLoading}
                className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold text-lg rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Creating account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </div>
          )}

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">or continue with</span>
            </div>
          </div>

          {/* Social Login Options */}
          <div className="grid grid-cols-2 gap-3">
            <button className="py-2.5 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-gray-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="py-2.5 px-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-gray-700">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 mt-6">
          {isLogin ? 'Protected by encryption and security protocols' : 'Your data is safe and secure with us'}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;