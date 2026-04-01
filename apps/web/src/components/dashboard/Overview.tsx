'use client'

import StatCard from './StatCard'
import { useEffect, useState } from 'react'

export default function Overview() {
  const [stats, setStats] = useState({
    enrolled: 0,
    completed: 0,
    certificates: 0,
    wishlist: 0,
  })

  const [recentCourses, setRecentCourses] = useState<any[]>([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const res = await fetch('/api/user/courses')
      const data = await res.json()

      const courses = data.courses || []

      setStats({
        enrolled: courses.length,
        completed: courses.filter((c: any) => c.completed).length,
        certificates: courses.filter((c: any) => c.certificate).length,
        wishlist: 7, // replace later with API
      })

      setRecentCourses(courses.slice(0, 3))
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="space-y-8">

      {/* Welcome */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">
          Overview
        </h2>
        <p className="text-sm text-gray-500">
          Track your learning progress and continue where you left off.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Enrolled" value={stats.enrolled} />
        <StatCard title="Completed" value={stats.completed} />
        <StatCard title="Certificates" value={stats.certificates} />
        <StatCard title="Wishlist" value={stats.wishlist} />
      </div>

      {/* Continue Learning */}
      <div>
        <h3 className="text-lg font-semibold mb-3">Continue Learning</h3>

        {recentCourses.length === 0 ? (
          <p className="text-sm text-gray-500">
            No courses yet. Start learning today 
          </p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {recentCourses.map((course) => (
              <div
                key={course.id}
                className="border rounded-lg p-4 hover:shadow cursor-pointer transition"
              >
                <h4 className="font-medium text-gray-900">
                  {course.title}
                </h4>

                <p className="text-sm text-gray-500 mt-1">
                  Progress: {course.progress || 0}%
                </p>

                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div
                    className="bg-black h-2 rounded"
                    style={{ width: `${course.progress || 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  )
}