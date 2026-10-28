import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { FaBolt, FaShieldAlt, FaCheckCircle, FaSpinner, FaExclamationTriangle } from 'react-icons/fa'

const SSOLoginPage = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { ssoLogin, user } = useAuth()
  const [status, setStatus] = useState('Connecting to Worksuite CRM...')
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState(null)
  const hasRunRef = useRef(false)

  useEffect(() => {
    if (hasRunRef.current) return
    hasRunRef.current = true

    const performSSO = async () => {
      try {
        const ticket = searchParams.get('ticket')
        const isEmbeddedMode = searchParams.get('embedded') === 'true' || (typeof window !== 'undefined' && window.self !== window.top)
        if (isEmbeddedMode) {
          sessionStorage.setItem('is_embedded', 'true')
        }

        const redirectParam = searchParams.get('redirect')
        let targetUrl = redirectParam || '/app/admin/dashboard'
        if (isEmbeddedMode && !targetUrl.includes('embedded=')) {
          targetUrl += (targetUrl.includes('?') ? '&' : '?') + 'embedded=true'
        }

        // Sanitize URL bar immediately so tickets do not remain in history or referrers
        try {
          window.history.replaceState({}, document.title, window.location.pathname)
        } catch (_) {}

        // If no ticket provided, check if existing session is already valid
        if (!ticket) {
          if (user && localStorage.getItem('token')) {
            setIsSuccess(true)
            setStatus(`Welcome back, ${user.name || 'User'}!`)
            navigate(targetUrl, { replace: true })
            return
          }
          setErrorMsg('No secure SSO exchange ticket was provided. Please launch this module from CRM - Energy.')
          setStatus('Authentication required')
          return
        }

        setStatus('Verifying cryptographic SSO exchange ticket...')

        // Call backend SSO with the signed ticket
        const res = await ssoLogin({
          ssoTicket: ticket
        })

        if (res?.success) {
          setIsSuccess(true)
          setStatus(`Authorized as ${res.user?.name || 'User'}. Launching workspace...`)
          setTimeout(() => {
            navigate(targetUrl, { replace: true })
          }, 150)
        } else {
          // If the ticket was already consumed (replay) or expired,
          // but the user already has a valid session token in Worksuite, proceed smoothly
          const existingToken = localStorage.getItem('token') || localStorage.getItem('authToken')
          if (existingToken) {
            setIsSuccess(true)
            setStatus('Active session verified. Launching workspace...')
            navigate(targetUrl, { replace: true })
            return
          }

          setErrorMsg(res?.error || 'Authentication handshake could not be completed.')
          setStatus('Authentication error')
        }
      } catch (err) {
        console.error('SSO Login Error:', err)
        setErrorMsg(err.message || 'Unable to connect to Worksuite server')
        setStatus('Connection error')
      }
    }

    performSSO()
  }, [searchParams, navigate, ssoLogin, user])

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-800/90 backdrop-blur-xl border border-slate-700/80 rounded-2xl p-8 shadow-2xl text-center">
        <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-tr from-amber-500 via-orange-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
          <FaBolt className="text-white text-2xl" />
        </div>

        <h2 className="text-xl font-bold text-white mb-2 flex items-center justify-center gap-2">
          <span>Worksuite CRM</span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-medium">
            SSO Bridge
          </span>
        </h2>

        <p className="text-sm text-slate-300 mb-6">{status}</p>

        {errorMsg ? (
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 text-xs text-rose-300 mb-4">
            <FaExclamationTriangle className="mx-auto mb-2 text-rose-400 text-lg" />
            <p className="font-semibold mb-1">SSO Authentication Failed</p>
            <p className="text-rose-300/80 mb-3">{errorMsg}</p>
            <button
              onClick={() => navigate('/login', { replace: true })}
              className="px-4 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-medium rounded-lg shadow transition-all"
            >
              Sign In Directly
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-3 text-indigo-400">
            {isSuccess ? (
              <FaCheckCircle className="text-emerald-400 text-xl animate-bounce" />
            ) : (
              <FaSpinner className="animate-spin text-xl text-indigo-400" />
            )}
            <span className="text-xs font-medium text-slate-400">
              {isSuccess ? 'Authorized. Loading workspace...' : 'Transferring credentials...'}
            </span>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-slate-700/50 flex items-center justify-center gap-2 text-xs text-slate-500">
          <FaShieldAlt className="text-slate-400" />
          <span>Connected seamlessly with CRM nErgy AI</span>
        </div>
      </div>
    </div>
  )
}

export default SSOLoginPage
