import type React from "react"
import SlideShow from "../components/slideShow" 

const citImages: string[] = ["/1.png", "/2.png", "/3.png"]

const takshashilaImages: string[] = ["/1.png", "/2.png", "/3.png"]

const AboutSection: React.FC = () => {
  return (
    <section
      id="about"
      className="min-h-[180vh] bg-grey/50 bg-opacity-40 z-10 backdrop-blur-sm flex flex-col items-center justify-center py-24 px-4 md:px-16 overflow-hidden"
      data-scroll-section
    >
      {/* <h1 className="text-5xl font-lexend text-white mb-20">ABOUT US</h1> */}

      {/* CIT Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* CIT Content */}
          <div className="md:w-1/2 space-y-6">
            <h2
              className="text-4xl text-white relative pb-4 after:content-[''] 
                        after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-green-600 font-lexend"
            >
              ABOUT CHENNAI INSTITUTE OF TECHNOLOGY
            </h2>
            <div className="space-y-4 text-white/90 font-lexend-deca">
              <p>
                A prominent institution ranking amongst the top colleges in Tamil Nadu, was established with an
                initiative to provide pragmatic learning. The institution has also partnered with a number of companies
                to set a worldwide standard by offering students a diverse range of possibilities that combine education
                and recreation.
              </p>
              <p>
                The students&apos; appetite for knowledge makes them thrive to prepare for the ready-to-serve industrial
                requirements. This is delivered by CIT through professional ethics which is sated by frequent guest
                lectures by professionals from various industries and academic backgrounds. Chennai Institute of
                Technology has been awarded the National Award of Excellence for Best Placements &amp; has been ranked
                Second in Tamil Nadu. Our college has made dreams of thousands of students come true
              </p>
              <div className="border-l-4 border-[#2cae51] pl-6">
                <blockquote className="italic text-xl">
                  &ldquo;Our objective for establishing CIT is to transfer our knowledge to you, so that you can
                  transform into a proper engineer&rdquo;
                </blockquote>
                <cite className="block mt-4 text-[#2cae51]">~ Shri Sriram Parthasarathy</cite>
              </div>
            </div>
          </div>

          {/* CIT Slideshow */}
          <div className="md:w-1/2 w-full rounded-xl overflow-hidden shadow-xl">
            <SlideShow images={citImages} height="400px" interval={4000} />
          </div>
        </div>
      </div>

      {/* Takshashila Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row-reverse items-center gap-12">
          {/* Takshashila Content */}
          <div className="md:w-1/2 space-y-6">
            <h2
              className="text-4xl font-lexend text-white relative pb-4 after:content-[''] 
                        after:absolute after:bottom-0 after:left-0 after:w-16 after:h-1 after:bg-green-600"
            >
              ABOUT TAKSHASHILA
            </h2>
            <div className="space-y-4 text-white/90 font-lexend-deca">
              <p>
                The Grand Annual Cultural Fiesta of Chennai Institute Of Technology is an eminent spectacle that gives
                the student community a platform to showcase their talents and sculpt their skills. This memorable
                occasion is a perfect fusion of entertainment and knowledge-filled atmosphere with a potpourri of genres
                that escalate the vibrance of celebration. The event inculcates a blend of virtues among the students
                which makes them shine out of the crowd. This time, Takshashila&apos;s voyage will be an exhilarating
                one, full of adventures that are fished straight out of the ocean.
              </p>
              <p>
                Through workshops, competitions, and technical presentations, Takshashila provides a platform for
                students to showcase their talents and learn from industry experts.
              </p>
            </div>
          </div>

          {/* Takshashila Slideshow */}
          <div className="md:w-1/2 w-full rounded-xl overflow-hidden shadow-xl">
            <SlideShow images={takshashilaImages} height="400px" interval={4000} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection

