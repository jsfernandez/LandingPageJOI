'use client'

import { useState, FormEvent } from 'react'

interface FormData {
  nombre: string
  email: string
  telefono: string
  arquetipo: string
  estilo: 'realista' | 'anime'
  aceptaTerminos: boolean
}

export default function PreregisterForm() {
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    arquetipo: '',
    estilo: 'realista',
    aceptaTerminos: false,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const archetypes = [
    { id: 'anfitriona', name: 'La Anfitriona' },
    { id: 'ejecutiva', name: 'La Ejecutiva' },
    { id: 'musa', name: 'La Musa' },
    { id: 'porrista', name: 'La Porrista' },
  ]

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido'
    }

    if (!formData.arquetipo) {
      newErrors.arquetipo = 'Debes seleccionar un arquetipo'
    }

    if (!formData.aceptaTerminos) {
      newErrors.aceptaTerminos = 'Debes aceptar los términos y condiciones'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // TODO: Conectar con API backend cuando esté disponible
      // const response = await fetch('/api/preregister', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // })

      // Simulación de envío
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSubmitStatus('success')
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        arquetipo: '',
        estilo: 'realista',
        aceptaTerminos: false,
      })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <section id="preregister" className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Preregístrate ahora
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2">
            Sé uno de los primeros en experimentar Joi. Reserva tu lugar hoy.
          </p>
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-5 sm:p-6 md:p-8 lg:p-12 border border-gray-200">
          {submitStatus === 'success' ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                ¡Preregistro exitoso!
              </h3>
              <p className="text-gray-600 mb-6">
                Te contactaremos pronto con más información sobre el lanzamiento.
              </p>
              <button
                onClick={() => setSubmitStatus('idle')}
                className="px-6 py-2 text-purple-600 font-semibold hover:text-purple-700"
              >
                Enviar otro preregistro
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* Nombre completo */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => handleChange('nombre', e.target.value)}
                  className={`w-full text-base px-4 py-3.5 sm:py-3 rounded-lg border min-h-[48px] ${
                    errors.nombre ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                  placeholder="Tu nombre completo"
                />
                {errors.nombre && (
                  <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className={`w-full text-base px-4 py-3.5 sm:py-3 rounded-lg border min-h-[48px] ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all`}
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono <span className="text-gray-400">(opcional)</span>
                </label>
                <input
                  type="tel"
                  id="telefono"
                  value={formData.telefono}
                  onChange={(e) => handleChange('telefono', e.target.value)}
                  className="w-full text-base px-4 py-3.5 sm:py-3 rounded-lg border border-gray-300 min-h-[48px] focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                  placeholder="+56 9 1234 5678"
                />
              </div>

              {/* Arquetipo */}
              <div>
                <label htmlFor="arquetipo" className="block text-sm font-medium text-gray-700 mb-2">
                  Personalidad preferida <span className="text-red-500">*</span>
                </label>
                <select
                  id="arquetipo"
                  value={formData.arquetipo}
                  onChange={(e) => handleChange('arquetipo', e.target.value)}
                  className={`w-full text-base px-4 py-3.5 sm:py-3 rounded-lg border min-h-[48px] ${
                    errors.arquetipo ? 'border-red-500' : 'border-gray-300'
                  } focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white`}
                >
                  <option value="">Tu personalidad más querida</option>
                  {archetypes.map((arch) => (
                    <option key={arch.id} value={arch.id}>
                      {arch.name}
                    </option>
                  ))}
                </select>
                {errors.arquetipo && (
                  <p className="mt-1 text-sm text-red-500">{errors.arquetipo}</p>
                )}
              </div>

              {/* Estilo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Estilo de avatar <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex items-center min-h-[44px] cursor-pointer">
                    <input
                      type="radio"
                      name="estilo"
                      value="realista"
                      checked={formData.estilo === 'realista'}
                      onChange={(e) => handleChange('estilo', e.target.value)}
                      className="mr-3 w-5 h-5 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                    <span className="text-base text-gray-700">Realista</span>
                  </label>
                  <label className="flex items-center min-h-[44px] cursor-pointer">
                    <input
                      type="radio"
                      name="estilo"
                      value="anime"
                      checked={formData.estilo === 'anime'}
                      onChange={(e) => handleChange('estilo', e.target.value)}
                      className="mr-3 w-5 h-5 text-purple-600 focus:ring-purple-500 cursor-pointer"
                    />
                    <span className="text-base text-gray-700">Anime</span>
                  </label>
                </div>
              </div>

              {/* Términos y condiciones */}
              <div>
                <label className="flex items-start cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.aceptaTerminos}
                    onChange={(e) => handleChange('aceptaTerminos', e.target.checked)}
                    className={`mt-1 mr-3 w-5 h-5 text-purple-600 focus:ring-purple-500 cursor-pointer flex-shrink-0 ${
                      errors.aceptaTerminos ? 'border-red-500' : ''
                    }`}
                  />
                  <span className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    Acepto los{' '}
                    <a href="#terminos" className="text-purple-600 hover:underline">
                      términos y condiciones
                    </a>{' '}
                    y la{' '}
                    <a href="#privacidad" className="text-purple-600 hover:underline">
                      política de privacidad
                    </a>{' '}
                    <span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.aceptaTerminos && (
                  <p className="mt-1 text-sm text-red-500">{errors.aceptaTerminos}</p>
                )}
              </div>

              {/* Sección de pago con Ko-fi */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 sm:p-8 border-2 border-purple-200">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    Elige tu plan y apoya el proyecto
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                    Selecciona el plan de Joi que mejor se adapte a ti y contribuye al desarrollo del proyecto. 
                    Tu apoyo nos ayuda a hacer de Joi una realidad.
                  </p>
                </div>
                
                <div className="flex flex-col items-center gap-4">
                  <a
                    href="https://ko-fi.com/joi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-base sm:text-lg"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.881 8.948c-.169-4.225-3.663-7.599-7.881-7.599-4.317 0-7.713 3.521-7.881 7.599-.052.52-.052.52-.052 1.052 0 .532 0 .532.052 1.052.168 4.078 3.564 7.599 7.881 7.599 4.218 0 7.712-3.374 7.881-7.599.052-.52.052-.52.052-1.052 0-.532 0-.532-.052-1.052zm-1.904 1.104c-.052.52-.052.52-.052 1.052 0 .532 0 .532.052 1.052.126 3.126-2.438 5.699-5.526 5.699-3.087 0-5.652-2.573-5.777-5.699-.052-.52-.052-.52-.052-1.052 0-.532 0-.532.052-1.052.125-3.126 2.69-5.699 5.777-5.699 3.088 0 5.652 2.573 5.526 5.699z"/>
                      <path d="M12.029 5.111c-1.916 0-3.47 1.554-3.47 3.47s1.554 3.47 3.47 3.47 3.47-1.554 3.47-3.47-1.554-3.47-3.47-3.47zm0 5.888c-1.333 0-2.418-1.085-2.418-2.418s1.085-2.418 2.418-2.418 2.418 1.085 2.418 2.418-1.085 2.418-2.418 2.418z"/>
                    </svg>
                    Ver planes en Ko-fi
                  </a>
                  <p className="text-xs sm:text-sm text-gray-500 text-center">
                    Al hacer clic, serás redirigido a Ko-fi donde podrás elegir tu plan y realizar el pago de forma segura.
                  </p>
                </div>
              </div>

              {/* Botón de envío */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full min-h-[48px] px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-base sm:text-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  'Confirmar preregistro'
                )}
              </button>

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-sm text-red-600">
                    Hubo un error al enviar el formulario. Por favor, intenta nuevamente.
                  </p>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

