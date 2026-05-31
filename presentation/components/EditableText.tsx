'use client'

import { useState, useEffect } from 'react'
import { Edit2, Check, X } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

interface EditableTextProps {
  value: string
  onChange: (newValue: string) => void
  className?: string
  placeholder?: string
  multiline?: boolean
  maxLength?: number
}

export default function EditableText({ 
  value, 
  onChange, 
  className = '', 
  placeholder = 'Click to edit',
  multiline = false,
  maxLength
}: EditableTextProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(value)
  const { isEditMode } = useAuth()

  useEffect(() => {
    setEditValue(value)
  }, [value])

  const handleSave = () => {
    if (editValue.trim() !== value) {
      onChange(editValue.trim())
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  if (!isEditMode) {
    return <span className={className}>{value || placeholder}</span>
  }

  if (isEditing) {
    return (
      <div className="flex items-start gap-2">
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`flex-1 p-2 border border-primary-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none ${className}`}
            placeholder={placeholder}
            maxLength={maxLength}
            rows={3}
            autoFocus
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`flex-1 p-2 border border-primary-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent ${className}`}
            placeholder={placeholder}
            maxLength={maxLength}
            autoFocus
          />
        )}
        <div className="flex gap-1">
          <button
            onClick={handleSave}
            className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
            title="Save"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
            title="Cancel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative">
      <span className={className}>{value || placeholder}</span>
      <button
        onClick={() => setIsEditing(true)}
        className="absolute -right-6 top-0 opacity-0 group-hover:opacity-100 p-1 text-primary-600 hover:bg-primary-50 rounded transition-all"
        title="Edit"
      >
        <Edit2 className="w-3 h-3" />
      </button>
    </div>
  )
}
