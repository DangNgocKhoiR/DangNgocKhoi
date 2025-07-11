"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Moon, Sun, Calendar, Clock, Users, Quote, Share2, Heart, Star, Target, Zap, GithubIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { NewsSection, type NewsArticle } from "@/components/new-section"
import { ThemeDialog, type ThemeOption, type BackgroundSettings } from "@/components/theme-dialog"
import Link from "next/link"

const motivationalQuotes = [
  {
    quote: "Cùng nhau cố gắng nhé! 💪",
    author: "DangNgocKhoi",
    translation: "Let's work hard together! 💪",
  },
  {
    quote: "Trí thức là sức mạnh",
    author: "F.Bacon",
    translation: "Knowledge is power",
  },
  {
    quote: "Học, học nữa, học mãi",
    author: "Hồ Chí Minh",
    translation: "Study, study more, study forever",
  },
  {
    quote: "Thành công là kết quả của sự chuẩn bị, làm việc chăm chỉ và học hỏi từ thất bại",
    author: "Colin Powell",
    translation: "Success is the result of preparation, hard work, and learning from failure",
  },
  {
    quote: "Giáo dục là vũ khí mạnh nhất mà bạn có thể sử dụng để thay đổi thế giới",
    author: "Nelson Mandela",
    translation: "Education is the most powerful weapon you can use to change the world",
  },
  {
    quote: "Đầu tư vào tri thức luôn mang lại lợi nhuận tốt nhất",
    author: "Benjamin Franklin",
    translation: "An investment in knowledge pays the best interest",
  },
  {
    quote: "Cùng nhau cố gắng nhé! 💪",
    author: "DangNgocKhoi",
    translation: "Let's work hard together! 💪",
  },
]

const newsArticles: NewsArticle[] = [
  {
    id: 1,
    title: "Nỗ lực về đích trong Kỳ thi tốt nghiệp THPT 2025",
    excerpt: "Kỳ thi tốt nghiệp THPT năm 2025 là dấu mốc quan trọng khi lần đầu tiên áp dụng Chương trình giáo dục phổ thông 2018, với nhiều đổi mới về cấu trúc đề thi, đặc biệt là tăng cường câu hỏi vận dụng thực tiễn nhằm phát huy năng lực tư duy và giải quyết vấn đề của học sinh. Trước yêu cầu cao hơn của kỳ thi, các trường học trên địa bàn tỉnh đã và đang tích cực đổi mới phương pháp ôn tập, tổ chức thi thử, phân loại học sinh theo năng lực, nhằm giúp các em làm bài hiệu quả và đạt kết quả tốt nhất.",
    category: "Thông tin kỳ thi",
    date: "2025-06-12",
    readTime: "15 phút đọc",
    priority: "low",
    articleUrl: "https://baophutho.vn/no-luc-ve-dich-trong-ky-thi-tot-nghiep-thpt-2025-234313.htm"
  },
  {
    id: 2,
    title: "LỊCH THI TỐT NGHIỆP THPT năm 2025",
    excerpt: "Lịch thi tốt nghiệp THPT năm 2025 đã được Bộ Giáo dục và Đào tạo công bố, với nhiều điểm mới và thay đổi quan trọng. Theo quy định của Bộ GDĐT, Kỳ thi tốt nghiệp THPT năm 2025 được tổ chức vào các ngày 25, 26, 27, 28/6.",
    category: "Thông tin kỳ thi",
    date: "2025-06-16",
    readTime: "15 phút đọc",
    priority: "high",
    articleUrl: "https://xaydungchinhsach.chinhphu.vn/chi-tiet-lich-thi-tot-nghiep-thpt-nam-2025-119250324122530018.htm"
  }
]

const themeOptions: ThemeOption[] = [
  {
    id: "elegant-green",
    name: "Xanh Lá Thanh Lịch",
    gradient: "linear-gradient(135deg, #1a5276 0%, #117864 100%)",
    preview: "/placeholder.svg?height=100&width=200&text=Elegant+Green",
  },
  {
    id: "ocean-blue",
    name: "Xanh Đại Dương",
    gradient: "linear-gradient(135deg, #2980b9 0%, #6dd5fa 100%)",
    preview: "/placeholder.svg?height=100&width=200&text=Ocean+Blue",
  },
  {
    id: "sunset-orange",
    name: "Cam Hoàng Hôn",
    gradient: "linear-gradient(135deg, #f12711 0%, #f5af19 100%)",
    preview: "/placeholder.svg?height=100&width=200&text=Sunset+Orange",
  },
  {
    id: "purple-dream",
    name: "Tím Mộng Mơ",
    gradient: "linear-gradient(135deg, #8e44ad 0%, #c0392b 100%)",
    preview: "/placeholder.svg?height=100&width=200&text=Purple+Dream",
  },
  {
    id: "forest-green",
    name: "Xanh Rừng",
    gradient: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
    preview: "/placeholder.svg?height=100&width=200&text=Forest+Green",
  },
  {
    id: "night-sky",
    name: "Bầu Trời Đêm",
    gradient: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    preview: "/placeholder.svg?height=100&width=200&text=Night+Sky",
  },
]

export default function THPT2025Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [currentQuote, setCurrentQuote] = useState(0)
  const [currentTheme, setCurrentTheme] = useState("elegant-green")
  const [customBackground, setCustomBackground] = useState("")
  const [backgroundSettings, setBackgroundSettings] = useState<BackgroundSettings>({
    imageUrl: "",
    size: "cover",
    position: "center",
    repeat: "no-repeat"
  })
  const [studyStreak, setStudyStreak] = useState(12)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // THPT exam date: June 26, 2025
  const examDate = new Date("2025-06-26T07:30:00")

  useEffect(() => {
    setMounted(true)

    // Load saved theme and background from localStorage
    const savedTheme = localStorage.getItem('thpt-countdown-theme')
    const savedBackground = localStorage.getItem('thpt-countdown-background')
    const savedSettings = localStorage.getItem('thpt-countdown-background-settings')

    if (savedTheme) {
      setCurrentTheme(savedTheme)
    }

    if (savedBackground) {
      setCustomBackground(savedBackground)
    }

    if (savedSettings) {
      const settings = JSON.parse(savedSettings)
      setBackgroundSettings({
        imageUrl: savedBackground || "",
        size: settings.size || "cover",
        position: settings.position || "center",
        repeat: settings.repeat || "no-repeat"
      })
    }

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = examDate.getTime() - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const quoteTimer = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % motivationalQuotes.length)
    }, 8000)

    return () => clearInterval(quoteTimer)
  }, [])

  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId)
    setCustomBackground("")
    setBackgroundSettings({
      imageUrl: "",
      size: "cover",
      position: "center",
      repeat: "no-repeat"
    })
    // Save theme to localStorage
    localStorage.setItem('thpt-countdown-theme', themeId)
    // Clear custom background from localStorage when switching to theme
    localStorage.removeItem('thpt-countdown-background')
    localStorage.removeItem('thpt-countdown-background-settings')
  }

  const handleCustomImageUpload = (imageUrl: string, settings?: BackgroundSettings) => {
    setCustomBackground(imageUrl)
    if (settings) {
      setBackgroundSettings(settings)
    }
    // Save custom background to localStorage
    localStorage.setItem('thpt-countdown-background', imageUrl)
    // Clear theme selection since we're using custom background
    localStorage.removeItem('thpt-countdown-theme')
  }

  const clearStoredPreferences = () => {
    localStorage.removeItem('thpt-countdown-theme')
    localStorage.removeItem('thpt-countdown-background')
    localStorage.removeItem('thpt-countdown-background-settings')
    setCurrentTheme("elegant-green")
    setCustomBackground("")
    setBackgroundSettings({
      imageUrl: "",
      size: "cover",
      position: "center",
      repeat: "no-repeat"
    })
  }

  const shareCountdown = () => {
    if (navigator.share) {
      navigator.share({
        title: `Đếm ngược ngày thi Tốt nghiệp THPT ${examDate.getFullYear()}`,
        text: `Còn ${timeLeft.days} ngày nữa là đến ngày thi Tốt nghiệp THPT ${examDate.getFullYear()}! Cùng nhau cố gắng nhé! 💪`,
        url: window.location.href,
      })
    }
  }

  const getBackgroundStyles = () => {
    if (customBackground) {
      return {
        backgroundImage: `url(${customBackground})`,
        backgroundSize: backgroundSettings.size,
        backgroundPosition: backgroundSettings.position.replace('-', ' '),
        backgroundRepeat: backgroundSettings.repeat,
      }
    } else {
      const selectedTheme = themeOptions.find((t) => t.id === currentTheme)
      const gradient = selectedTheme?.gradient || themeOptions[0].gradient
      return {
        backgroundImage: gradient,
        backgroundSize: "auto",
        backgroundPosition: "initial",
        backgroundRepeat: "no-repeat",
      }
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden transition-all duration-1000"
      style={getBackgroundStyles()}
    >
      {/* Animated Background Shapes */}
      {!customBackground && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/5 rounded-full blur-lg animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-white/10 rounded-full blur-xl animate-bounce delay-500"></div>

          {/* Geometric shapes inspired by the original design */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 800">
            <circle cx="100" cy="500" r="150" fill="rgba(255,255,255,0.05)" />
            <circle cx="1100" cy="200" r="80" fill="rgba(255,255,255,0.08)" />
            <path
              d="M0,600 Q300,400 600,500 T1200,400"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
          </svg>
        </div>
      )}

      {/* Header */}
      <header className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Đếm Ngược Ngày Thi Tốt Nghiệp THPT {examDate.getFullYear()}</h1>
              <p className="text-white/70 text-sm">DangNgocKhoi</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={shareCountdown} className="text-white hover:bg-white/20">
              <Share2 className="h-4 w-4" />
            </Button>
            <ThemeDialog
              themes={themeOptions}
              currentTheme={currentTheme}
              onThemeChange={handleThemeChange}
              onCustomImageUpload={handleCustomImageUpload}
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-white hover:bg-white/20"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-3 space-y-8">
        {/* Main Countdown Section */}
        <section className="text-center">
          {/* Motivational Quote */}
          <div className="mb-8">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
              <CardContent>
                <Quote className="h-8 w-8 mx-auto mb-4 text-white/80" />
                <blockquote className="text-xl md:text-2xl font-medium italic mb-3">
                  "{motivationalQuotes[currentQuote].quote}"
                </blockquote>
                <cite className="text-white/80 text-lg">— {motivationalQuotes[currentQuote].author}</cite>
                <p className="text-white/60 text-sm mt-2 italic">{motivationalQuotes[currentQuote].translation}</p>
              </CardContent>
            </Card>
          </div>

          {/* Exam Date */}
          <div className="mb-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white max-w-full mx-auto">
              <CardContent>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <Clock className="h-5 w-5 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-white/80 text-sm font-medium uppercase tracking-wider">Ngày thi chính thức</p>
                    <p className="text-white text-xl font-bold">{examDate.toLocaleDateString('vi-VN')}</p>
                  </div>
                </div>
                <div className="text-center">
                  <Badge className="bg-emerald-500/20 text-emerald-100 border-emerald-400/30 px-3 py-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    {examDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Countdown Timer */}
          <div className="mb-8">
            <h2 className="text-white/90 text-xl mb-6 font-medium">Thời gian còn lại</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-black/40 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{timeLeft.days}</div>
                <div className="text-white/80 uppercase tracking-wider text-sm font-medium">Ngày</div>
              </div>
              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-black/40 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{timeLeft.hours}</div>
                <div className="text-white/80 uppercase tracking-wider text-sm font-medium">Giờ</div>
              </div>
              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-black/40 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{timeLeft.minutes}</div>
                <div className="text-white/80 uppercase tracking-wider text-sm font-medium">Phút</div>
              </div>
              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-black/40 transition-all duration-300 transform hover:scale-105">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{timeLeft.seconds}</div>
                <div className="text-white/80 uppercase tracking-wider text-sm font-medium">Giây</div>
              </div>
            </div>
          </div>

          {/* Motivational Badges */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
            <Badge className="bg-emerald-500/20 text-emerald-100 border-emerald-400/30 px-4 py-2 hover:bg-emerald-500/30 transition-colors">
              <Star className="h-4 w-4 mr-2" />
              Nỗ lực mỗi ngày
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-100 border-blue-400/30 px-4 py-2 hover:bg-blue-500/30 transition-colors">
              <Users className="h-4 w-4 mr-2" />
              Đồng hành cùng nhau
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-100 border-purple-400/30 px-4 py-2 hover:bg-purple-500/30 transition-colors">
              <Target className="h-4 w-4 mr-2" />
              Hướng tới thành công
            </Badge>
            <Badge className="bg-orange-500/20 text-orange-100 border-orange-400/30 px-4 py-2 hover:bg-orange-500/30 transition-colors">
              <Zap className="h-4 w-4 mr-2" />
              Tin tưởng bản thân
            </Badge>
            </div>
        </section>

        {/* News Section - Now using the extracted component */}
        <NewsSection articles={newsArticles} />

        {/* Study Tips */}
        <section>
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardHeader>
              <CardTitle className="text-white text-xl">Mẹo học tập hiệu quả</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                  <div className="text-4xl mb-3">📚</div>
                  <h3 className="text-white font-semibold mb-2">Đọc hiểu sâu</h3>
                  <p className="text-white/70 text-sm">Ghi chú và tóm tắt những điểm quan trọng khi đọc</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                  <div className="text-4xl mb-3">⏰</div>
                  <h3 className="text-white font-semibold mb-2">Quản lý thời gian</h3>
                  <p className="text-white/70 text-sm">Sử dụng kỹ thuật Pomodoro để tập trung học tập</p>
                </div>
                <div className="text-center p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-all">
                  <div className="text-4xl mb-3">🧘</div>
                  <h3 className="text-white font-semibold mb-2">Giữ bình tĩnh</h3>
                  <p className="text-white/70 text-sm">Thực hành thiền định và bài tập thở</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-md border-t border-white/10 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/70 text-center md:text-left mb-4 md:mb-0">

            </p>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white/70 ">
                <Heart className="h-4 w-4 mr-2" />
               DangNgocKhoi
              </Button>
              <div className="flex space-x-2">
                <div className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center">
                  <Link href="https://dangngockhoi.online" target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="h-4 w-4 text-white" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
