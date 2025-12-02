"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, ArrowUp } from "lucide-react";

const SacredPotatoPage: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const [showTOC, setShowTOC] = useState<boolean>(false);
  const [currentPart, setCurrentPart] = useState<string>("");

  useEffect(() => {
    setMounted(true);

    // Track reading progress
    const handleScroll = () => {
      const parts = document.querySelectorAll("[data-part]");
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      parts.forEach((part) => {
        const element = part as HTMLElement;
        const top = element.offsetTop;
        const bottom = top + element.offsetHeight;

        if (scrollPosition >= top && scrollPosition <= bottom) {
          setCurrentPart(element.dataset.part || "");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToPart = (partId: string) => {
    const element = document.getElementById(partId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setShowTOC(false);
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center">
        <div className="w-4 h-4 bg-purple-400 rounded-full animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white relative">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1a]/90 backdrop-blur-sm">
        <div className="container-wide">
          <div className="flex items-center justify-between h-16">
            <Link href="/soul/" className="flex items-center space-x-3 group">
              <Image
                src="/logo-symbol.png"
                alt="Ahiya"
                width={28}
                height={28}
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <span className="text-lg font-medium">Ahiya</span>
            </Link>

            <div className="flex items-center space-x-6">
              <Link
                href="/soul/writing"
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Writing</span>
              </Link>

              <button
                onClick={() => setShowTOC(!showTOC)}
                className="flex items-center space-x-2 text-slate-300 hover:text-white transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span className="hidden md:inline">Contents</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Table of Contents Overlay */}
      {showTOC && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm">
          <div className="fixed top-20 right-6 w-80 max-w-[calc(100vw-3rem)]">
            <div className="contemplative-card p-6">
              <h3 className="heading-lg mb-6 text-center">Table of Contents</h3>
              <div className="space-y-3">
                {[
                  {
                    id: "part-1",
                    title: "Part I: The Hollow Place",
                    current: currentPart === "part-1",
                  },
                  {
                    id: "part-2",
                    title: "Part II: The Seeking",
                    current: currentPart === "part-2",
                  },
                  {
                    id: "part-3",
                    title: "Part III: The Mirrors",
                    current: currentPart === "part-3",
                  },
                  {
                    id: "part-4",
                    title: "Part IV: The Sacred Potato",
                    current: currentPart === "part-4",
                  },
                ].map((part) => (
                  <button
                    key={part.id}
                    onClick={() => scrollToPart(part.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      part.current
                        ? "bg-purple-500/20 text-purple-200 border border-purple-500/30"
                        : "hover:bg-white/5"
                    }`}
                  >
                    {part.title}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowTOC(false)}
                className="w-full mt-6 py-2 text-sm text-slate-400 hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reading Progress Indicator */}
      <div className="fixed top-16 left-0 right-0 h-1 bg-white/10 z-30">
        <div
          className="h-full bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300"
          style={{
            width: `${Math.min(
              100,
              (window.scrollY /
                (document.documentElement.scrollHeight - window.innerHeight)) *
                100
            )}%`,
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-16">
        <div className="container-narrow text-center">
          <div className="animate-fade-in">
            <div className="breathing-glass inline-block px-6 py-3 mb-8">
              <div className="flex items-center space-x-2 text-purple-300">
                <span className="text-xl">📖</span>
                <span className="font-medium">Novella</span>
              </div>
            </div>

            <div className="text-6xl mb-6 animate-float">🥔</div>

            <h1 className="display-lg spacing-comfortable text-gentle">
              The Sacred Potato
            </h1>

            <p className="body-lg text-slate-400 spacing-comfortable">
              By Ahiya Butman
            </p>

            <p className="body-lg text-slate-300 max-w-2xl mx-auto spacing-generous leading-relaxed">
              A desert contemplative story about seeking, addiction, and the
              cosmic joke of consciousness taking itself too seriously.
            </p>

            <div className="flex items-center justify-center space-x-6 text-sm text-slate-400">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4" />
                <span>~60 min read</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>4 Parts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <article className="container-narrow">
        <div className="contemplative-card p-8 md:p-12 mb-16">
          {/* Part I */}
          <section id="part-1" data-part="part-1" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="heading-xl mb-4 text-purple-300">PART I</h2>
              <h3 className="heading-lg text-slate-200">THE HOLLOW PLACE</h3>
            </div>

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="sacred-text text-lg mb-8">
                Before words, the desert.
                <br />
                Before the desert, promises broken.
              </p>

              <p>
                Kai moves across sand that remembers nothing. Each footprint
                claims territory for seconds before wind reclaims it. This is
                his ninth season crossing. His body has become a vessel for this
                single purpose—lean intention wrapped in skin turned copper by
                relentless sun. Tendons that know precisely how much tension to
                maintain. Lungs that extract what they need from air so dry it
                pulls moisture from breath.
              </p>

              <p>
                Sometimes, in the space between one step and the next, awareness
                watches the body walking. The body continues. Sand yields. Sky
                remains indifferent.
              </p>

              <p>
                He reaches for his water skin. Numbers flow unbidden: 0.73
                liters remaining. At 0.05 liters per hour in current conditions,
                14.2 hours until the next well. These calculations rise to the
                surface of thought without effort—the engineer's reflexes
                persisting despite his attempts to escape them. His mouth will
                become dust. His lips will split slightly at the corners. This
                is mathematics, not sensation.
              </p>

              <p>
                "Three days left," he says, startling himself with the sound.
                The words scatter into empty air, leaving no trace. The
                University delegation would arrive in three days, expecting to
                see the revolutionary water management system he had designed.
                The system that could save countless lives during drought
                cycles. The system now sitting half-completed in his abandoned
                workshop.
              </p>

              <p>
                He tests the air flow across his sweat-dampened sleeve,
                calculating the rate of evaporation against skin temperature.
                Another automatic calibration. Kai pushes the thought away as he
                has a thousand times before. The desert demands his attention
                now.
              </p>

              <p>
                Traders recognize him at outposts before he speaks. Something in
                his gait. Something in the particular way desert light catches
                in his eyes. They no longer explain bargaining customs or offer
                warnings about traveling alone. Instead, their talk is of water
                quality at specific wells, of unusual rock formations that
                appeared after the last great storm, of subtle changes in trade
                routes.
              </p>

              <p>
                "You're the engineer who vanished," one trader mentioned last
                season, recognition dawning in his eyes. "The water modeling
                system—they said it could have predicted the Three Cities
                drought."
              </p>

              <p>
                Kai nodded once, neither confirming nor denying. The trader
                didn't press. Desert etiquette. Everyone out here was running
                from something.
              </p>

              <p>
                His maps have become extensions of memory. He rarely consults
                them now. His body knows the terrain, responds to gradient
                changes too subtle for conscious recognition. His thinking mind
                calculates distance, water consumption, likely changes in wind
                direction. Another part of him—neither body nor calculating
                mind—registers everything else. The precise configuration of
                clouds. The quality of silence. How light moves differently at
                different times of day.
              </p>

              <p>
                Night brings stars that burn overhead—not the navigational grid
                he'd once mapped and measured, but a weight pressing against his
                chest. Each pinpoint of light a question he couldn't answer.
                Sometimes Kai wakes to find his hand extended upward, fingers
                spread as if to catch something falling. Other times, he dreams
                of his water system working perfectly, saving cities, earning
                accolades he doesn't stay to receive.
              </p>

              <p>
                He rises from these dreams with a sensation he has never
                named—not quite longing, not quite memory, not quite
                anticipation. It dissipates with the first tasks of morning.
              </p>

              <p>
                "You're running away again," Neel had said the night before Kai
                left for the desert the first time. His oldest friend stood in
                the doorway of Kai's workshop, watching him pack instruments too
                delicate for desert travel.
              </p>

              <p>
                "The algorithms need field testing," Kai had replied, not
                looking up.
              </p>

              <p>
                "Of course they do." Neel's voice had been flat. "Just like the
                reservoir purification system needed 'additional research.' Just
                like the rainfall collection network needed 'more comprehensive
                data.' Always almost perfect, never quite finished."
              </p>

              <p>
                Kai had continued packing, fingers moving with precise
                efficiency.
              </p>

              <p>"Maybe I'm not looking for anything," he said finally.</p>

              <p>
                Neel's breath escaped in a sound too sharp for laughter. "That
                would be a first." He'd handed Kai a sealed message tube. "If
                you ever decide to come back, give this to Professor Amina. It
                explains the modifications I made to your flow calculations."
              </p>

              <p>
                The tube still sits at the bottom of Kai's pack, untouched. He
                adjusted the weight on his shoulders. The familiar ache of
                regret settled between his shoulder blades—heavier than the
                pack, heavier than thirst. Around him, the desert stretched in
                every direction. He expected nothing today. He expected nothing
                at all.
              </p>

              <p>
                The tree appears in the hour when light begins to change but
                shadows have not yet lengthened. It stands alone, impossible and
                certain. A single tree where nothing should grow, its branches
                heavy with fruit unlike any Kai has seen before. Each piece
                catches light differently, as if they were not all the same
                species but many, collected from countless orchards and somehow
                thriving together.
              </p>

              <p>
                His steps slow of their own accord. Something inside his chest
                expands, pushes against his ribs.
              </p>

              <p>
                Under the tree's shade sits a woman, her skin dark as burnished
                wood against white robes, her fingers moving steadily over a
                small stringed instrument. The sound it produces is
                delicate—three notes repeating, then a fourth that changes the
                meaning of the others. She doesn't look up as he approaches.
              </p>

              <p>
                Kai stops at the edge of the tree's shadow. "I haven't seen this
                kind of tree in the desert before."
              </p>

              <p>
                The woman's fingers continue their pattern. "Trees grow where
                they're needed." Her eyes, when they finally meet his, contain
                neither welcome nor dismissal—only complete attention that makes
                him suddenly aware of sand grit between his toes, the dried salt
                on his skin, the familiar weight of his body pressing down on
                the ground.
              </p>

              <p>"May I?" He gestures toward the shade.</p>

              <p>She nods once and shifts slightly, making space.</p>

              <p>
                In the shade, time behaves differently. The woman plays her
                instrument. Kai drinks from his water skin. Neither speaks. The
                branches above them move in currents of air too subtle to feel
                against skin.
              </p>

              <p>
                "Try one," she says eventually, nodding toward the fruit hanging
                just within reach.
              </p>

              <p>
                Kai hesitates, though he couldn't explain why. The fruit is
                heavier than it looks, warm like it has absorbed the day's heat.
                His hand trembles slightly as he raises it to his mouth.
              </p>

              <p>
                The first bite stops his breath. Something uncurls in his
                chest—a warmth spreading through numb fingers, into arms that
                had forgotten sensation. For three heartbeats, the silence
                between his thoughts stretches into actual quiet.
              </p>

              <p>
                Then it vanishes, leaving an absence more noticeable than
                before.
              </p>

              <p>He waits for something more to happen. Nothing does.</p>

              <p>"You expected more," the woman says. Not a question.</p>

              <p>Kai wipes juice from his chin. "I didn't expect anything."</p>

              <p>
                Her smile is brief but genuine. "Of course not." She returns to
                her instrument, creating a pattern that seems both random and
                inevitable. "I'm Senna."
              </p>

              <p>
                "Kai." He watches her fingers move across the strings. "Do you
                always play for trees?"
              </p>

              <p>
                The unexpected question startles a laugh from her—a bright sound
                at odds with her composed demeanor. "Only the interesting ones."
                She tilts her head. "Most travelers pass this tree without
                seeing it."
              </p>

              <p>"How is that possible? It's the only one for miles."</p>

              <p>
                "People see what they're looking for." Senna sets her instrument
                aside. "What brings you to the deep desert, Kai? You move like
                someone with purpose, not like the traders or the lost ones."
              </p>

              <p>
                He considers crafting an answer about exploration or trading
                opportunities. Instead, something simpler emerges: "I'm good at
                leaving."
              </p>

              <p>
                They travel together for eleven days, their paths converging
                without explanation. Under Senna's gaze, the urgency Kai usually
                carried loosens, thins, almost disappears.
              </p>

              <p>
                But when the time comes to part, the question returns, sharper
                than before. He stands at the edge of the encampment, unsure for
                a moment where his feet will take him.
              </p>

              <p className="sacred-text">
                West, the whisper comes, almost too faint to hear. There are
                trees that grow in clusters. The memory surfaces — a rumor
                passed around trading posts, vague as smoke, about trees that
                defied the desert's silence.
              </p>

              <p>Not purpose — only momentum.</p>

              <p>
                "You'll seek the fruit now," Senna says as they prepare to
                separate. Not judgment, merely observation.
              </p>

              <p>"Is that what you're doing?" he asks.</p>

              <p>
                Her laugh is unexpected. Bright as the sunrise. "No, I'm
                following the northern trade route. My father's business
                partners are expecting me in Karesh before the winter." She
                adjusts her pack with practiced movements. "The fruit is
                pleasant when I find it, but I don't arrange my journey around
                it."
              </p>

              <p>
                She kisses him once, lightly, then turns away. Kai watches until
                distance reduces her to a point, then to nothing against the
                empty landscape.
              </p>

              <p>
                That evening, alone in the cooling air, he dreams of fruit. In
                the dream, he understands its language, comprehends the message
                encoded in its flesh. He wakes reaching for something, fingers
                grasping air.
              </p>

              <p className="sacred-text">
                The space beneath his ribs aches with emptiness.
              </p>
            </div>
          </section>

          {/* Part II */}
          <section id="part-2" data-part="part-2" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="heading-xl mb-4 text-purple-300">PART II</h2>
              <h3 className="heading-lg text-slate-200">THE SEEKING</h3>
            </div>

            <div className="prose prose-lg prose-invert max-w-none">
              <p>
                The rumors prove true. In the western reaches of the desert,
                beyond terrain most travelers avoided, Kai finds the grove—seven
                trees growing in a loose circle around a small depression that
                might once have held water. Their branches are heavy with fruit,
                some so ripe they have fallen to the ground.
              </p>

              <p>
                He isn't the only one who has followed the whispers. Three other
                travelers have reached the grove before him. An old man with a
                trader's weathered face sits beneath one tree, methodically
                eating one fruit after another, his movements casual and
                unhurried. A woman wrapped in indigo cloth is placing precisely
                three fruits in her pack, counting under her breath. A young man
                stands apart, watching the others, his body held with the
                artificial stillness of someone restraining himself.
              </p>

              <p>
                Kai nods to each in turn, receiving acknowledgments of varying
                warmth, and selects his own tree to sit beneath. He chooses a
                fruit, noting how his hand now moves without hesitation, how
                anticipation has replaced apprehension.
              </p>

              <p>
                The taste remains extraordinary—complex layers of sweetness
                giving way to subtle tartness, then returning to sweetness
                again. But now he recognizes the pattern. The momentary
                fulfillment, the fleeting sense of completeness, followed by its
                disappearance and the hollow space reopening, somehow larger
                than before.
              </p>

              <p>
                He eats another. And another. The same sequence with slight
                variations.
              </p>

              <p>
                By evening, Kai's stomach aches from too much sweetness, yet the
                emptiness remains. He watches the others, recognizing in their
                movements his own compulsion reflected back at different stages.
              </p>

              <p>
                "First time in a grove?" The old man's voice startles Kai from
                his observations.
              </p>

              <p>Kai nods.</p>

              <p>
                "Thought so. You still have that look of wonder." The old man
                gestures to the space beside him. "Dalin."
              </p>

              <p>"Kai."</p>

              <p>
                Dalin offers him a water skin. "The sweetness gets overwhelming.
                Water helps."
              </p>

              <p>
                Kai drinks gratefully, realizing how thirsty the fruit has made
                him. As he hands the skin back, he notices the fine quality of
                Dalin's robes beneath the travel dust, the well-crafted rings on
                his fingers.
              </p>

              <p>
                "You don't look like the others at the grove," Kai observes, not
                completely sure what he means until the words are out.
              </p>

              <p>
                Dalin laughs, a practiced sound that suggests he laughs often
                and with calculation. "I'm not a fruit-seeker. I'm a
                connoisseur." He produces a small knife and slices the fruit
                he's holding into precise segments. "Most people gorge
                themselves without appreciation. The secret is to savor each
                piece mindfully."
              </p>

              <p>
                As he speaks, Dalin's eyes continually dart to the tree,
                counting the remaining fruit. His fingers tap against his thigh
                in a nervous rhythm that contradicts his casual tone.
              </p>

              <p>
                "How long have you been... appreciating the fruit?" Kai asks.
              </p>

              <p>
                "Seven years." Dalin's smile is tight at the edges. "I could
                stop anytime, of course. I simply choose not to. There's a
                subtle difference between the northern and southern varieties
                that few people recognize."
              </p>

              <p>
                Dalin's elaborate justifications remind Kai of his own
                explanations for leaving the University.{" "}
                <em>
                  I need space to develop my theories. Institutional constraints
                  stifle true innovation. The desert contains water patterns
                  crucial to my research.
                </em>{" "}
                All partially true. All fundamentally lies.
              </p>

              <p>
                As night falls, the woman in indigo approaches their fire. Jana
                introduces herself as a former mathematician from the eastern
                universities. She speaks in precise sentences, each word
                carefully chosen.
              </p>

              <p>
                "Three fruits every other day," she explains, showing Kai her
                notebook filled with elaborate calculations and charts. "Never
                more. The effects diminish with overindulgence, and the
                withdrawal period intensifies proportionally."
              </p>

              <p>
                Her hands tremble slightly as she turns the pages, though her
                voice remains steady. The notebook contains years of
                observations—fruit locations mapped against seasons, effects
                catalogued by type and duration, withdrawal symptoms quantified
                and analyzed.
              </p>

              <p>"And this system works?" Kai asks.</p>

              <p>
                Jana's smile is tight but proud. "Perfectly. The problem with
                most fruit seekers is lack of discipline."
              </p>

              <p>
                When Kai asks what brought her to the fruit initially, Jana
                pauses, her fingers tracing a complex equation in her notebook.
              </p>

              <p>
                "I spent fifteen years building theoretical models to predict
                rainfall patterns," she says finally. "One day I realized my
                colleagues were implementing simplified versions of my
                work—imperfect, practical applications—while I was still
                refining equations. They were saving lives with flawed methods
                while I..." She shrugs. "I came to the desert to see the actual
                rain patterns. Found a tree instead."
              </p>

              <p>
                That night, Kai dreams of his unfinished work at the University.
                The water modeling system he had designed to predict drought
                patterns across the desert regions. After three years of
                brilliance—acknowledged by everyone except himself—he had walked
                away one night, leaving no explanation.
              </p>

              <p className="sacred-text">
                Because you knew it wouldn't be perfect, Neel had said during
                their last conversation. And you'd rather be the brilliant mind
                who walked away than the one who created something flawed.
              </p>

              <p>
                Kai wakes with the taste of fruit in his mouth though he hasn't
                eaten since evening. The space beneath his ribs throbs like an
                old wound. He reaches for another fruit before the sun has fully
                risen.
              </p>

              <p>
                He walks for days without seeking another tree, clinging to the
                brittle comfort of distance, of empty horizons.
              </p>

              <p>
                Five days later, he encounters another tree standing alone in a
                rocky valley. He eats until his stomach rebels, then continues
                walking.
              </p>

              <p>
                Then the next tree appears — a week later, maybe less — and he
                reaches for it before thinking.
              </p>

              <p>
                Days stretch into each other, marked only by the ache, by the
                sudden, searing sweetness, by the shame that follows.
              </p>

              <p>The road dissolves.</p>

              <p>The seasons shift in colors too subtle to notice.</p>

              <p>
                Six months into his seeking, Kai receives an unexpected message
                at a trading post. The paper is expensive, the handwriting
                familiar—Professor Amina, his mentor at the University.
              </p>

              <div className="breathing-glass p-6 my-8 font-mono text-sm">
                <p>
                  <em>Kai,</em>
                </p>
                <p>
                  <em>
                    The Three Cities drought has entered its second year. Wells
                    are failing. Your water prediction system, even incomplete,
                    could save thousands of lives. A delegation will travel to
                    the Southern Oasis on the next full moon. If you wish to
                    assist, meet them there. No questions about your absence
                    will be asked.
                  </em>
                </p>
                <p>
                  <em>Your work matters, whether or not it is perfect.</em>
                </p>
                <p>
                  <em>—A</em>
                </p>
              </div>

              <p>
                Kai reads the letter three times, then carefully folds it into
                his pack. The Southern Oasis is ten days' travel from his
                current position. The full moon is twelve days away.
              </p>

              <p>
                He could make it easily. The message tube from Neel still sits
                at the bottom of his pack. Together with his original designs,
                it might be enough to make the system operational.
              </p>

              <p>
                That evening, he finds himself drawing calculations in the
                sand—flow rates, permeability variables, aquifer capacities—his
                fingers moving with muscle memory. For a moment, the familiar
                equations bring a different kind of satisfaction, a clarity
                distinct from the fruit's sweetness.
              </p>

              <p>
                Then he erases them with a sweep of his hand. Instead, he trades
                for information about a legendary grove of scarlet-fruited trees
                said to grow near the eastern mountains.
              </p>

              <p>
                The seasons turn. Summer heat gives way to autumn winds, then to
                winter's cold clarity, then to spring's brief explosion of
                desert flowers. Through all these changes, Kai continues his
                seeking, abandoning earlier patterns of discipline, allowing the
                fruit to become the organizing principle of his existence.
              </p>

              <p>
                His once-sturdy body grows gaunt, his movements taking on the
                watchful quality of perpetual scanning. He abandons trading
                entirely—the transactions too complex, too demanding of
                sustained attention. Better to barter labor for necessities when
                required, keeping his mind free for calculating the location of
                the next tree.
              </p>

              <p>
                "You've fallen far," a merchant observes when Kai exchanges a
                day's labor for basic supplies. The man's eyes hold recognition.
                "Weren't you working on water management systems at the
                University? I remember the presentations."
              </p>

              <p>
                "That was someone else," Kai replies, focusing instead on
                completing the work quickly so he can continue his journey. The
                hollow place has become a constant companion, occasionally
                quieted by the fruit but never for long enough.
              </p>

              <p>
                Memory intrudes with increasing frequency. The complex
                mathematical models he had abandoned at the University. The
                research team that had believed in his vision. The succession of
                lovers—Yasmin with her collection of rare books, Dario with his
                passionate political convictions, Lena with her intricate
                tattoos telling stories across her skin. Each one had offered
                genuine connection. From each one, Kai had eventually fled.
              </p>

              <p>
                <em>I need space to think,</em> he had told Yasmin.
                <br />
                <em>I'm not ready for this intensity,</em> he had explained to
                Dario.
                <br />
                <em>We want different things,</em> he had said to Lena.
              </p>

              <p>All partially true. All fundamentally lies.</p>

              <p>
                It is during the season of howling winds that Kai meets Jana
                again. She appears at his campfire without invitation, her
                approach so silent he doesn't notice her until she speaks.
              </p>

              <p>"You're going east," she says. "To the scarlet grove."</p>

              <p>
                Kai looks up, startled both by her presence and her certainty.
                He has told no one of his plans.
              </p>

              <p>
                Jana settles across from him, the firelight throwing sharp lines
                across her angular face. She is thinner than he remembers —
                bones showing at wrists and collarbone, movements jerky with
                suppressed urgency.
              </p>

              <p>
                Without preamble, she pulls out her notebook. The cover is torn
                now, pages frayed and packed with cramped notations. Entire
                margins filled with frantic amendments.
              </p>

              <p>
                "The eastern trees bear fruit through the new moon," she says,
                voice clipped. "Three fruits every other day. Four during the
                waning quarter. Adjustments made for elevation, soil
                composition, trade winds—"
              </p>

              <p>
                She flips through pages faster than he can follow, tapping a
                rhythm against her thigh, eyes too bright.
              </p>

              <p>Kai says nothing.</p>

              <p>
                In the calligrapher's precise script he had first met, he now
                sees only jagged desperation.
              </p>

              <p>
                "If you follow the rules perfectly," Jana says, "you maintain
                balance."
              </p>

              <p>She says it like an incantation.</p>

              <p>Like a prayer.</p>

              <p>"What happened to your rainfall models?" Kai asks quietly.</p>

              <p>
                Her hands still momentarily. "Never perfect enough," she
                whispers. "The trees... they offer a simpler perfection. Just
                follow the correct pattern." Her eyes meet his, suddenly lucid.
                "You understand, don't you? The need for the pattern to be
                flawless?"
              </p>

              <p>
                She travels with him for twenty days. Her system, once clean and
                mathematical, has grown labyrinthine — layers of contingencies,
                exceptions, special cases. At every tree, she mutters
                calculations under her breath, correcting, adjusting,
                re-weighing.
              </p>

              <p>
                On their twelfth day together, they find a tree exactly where
                Jana has predicted. While she methodically selects her three
                permitted fruits, Kai watches a pattern of light moving through
                the branches, creating shifting geometries on the ground. For a
                moment, he forgets to reach for the fruit, absorbed in this
                simple play of elements, his engineer's mind tracing the
                variables that create this precise configuration of light and
                shadow.
              </p>

              <p>The moment passes. He eats until nausea overtakes him.</p>

              <p>
                That night, as Jana sleeps beside him, a desert storm whips sand
                against their shelter. The wind carries voices from the trading
                posts they've visited—fragments of news about the continuing
                drought in the Three Cities region. Wells failing. Children sick
                from contaminated water. Relief efforts hampered by inability to
                predict which areas would be hit next.
              </p>

              <p>
                Kai's water prediction system, even incomplete, could have
                helped. The message tube from Neel, still untouched at the
                bottom of his pack, might contain the solution to the flaws he
                couldn't resolve.
              </p>

              <p>He reaches for another fruit instead.</p>

              <p>
                "Does it never exhaust you?" he asks Jana the next morning,
                watching her make notations in her book. "The constant
                management?"
              </p>

              <p>
                Her hand stills over the page. "What's the alternative?" Her
                voice is carefully neutral. "To consume until sickness? To let
                the seeking consume your life entirely?"
              </p>

              <p>The question hangs between them, unanswered.</p>

              <p>
                Eight days later, Jana turns southward toward a region where,
                according to her calculations, a particular variety of tree will
                be fruiting. Kai discovers his own path now leads eastward. They
                part without ceremony, two objects moving in trajectories
                determined by forces neither fully understands.
              </p>

              <p>
                At an oasis known for its bitter water, Kai meets a man whose
                seeking has progressed beyond his own. Ravi's clothes hang from
                his frame, his hands perpetually sticky with fruit juice, his
                eyes holding the wild light of someone standing at the edge of
                understanding but unable to step forward.
              </p>

              <p>
                "I know what it's doing to me," Ravi says without prompting as
                they fill their water skins. "Every morning I say never again,
                and every afternoon I'm back." His laugh catches in his throat.
                "But you understand, don't you? The emptiness when you don't
                have it? Like dying of thirst while drowning?"
              </p>

              <p>
                Kai understands perfectly, finding both comfort and disgust in
                this recognition.
              </p>

              <p>
                "I had a life once," Ravi continues, rubbing at his sternum as
                if trying to ease a physical pain. His hands move with
                unexpected grace despite their trembling—the hands of someone
                who once created beautiful things. "I was building a house near
                the eastern mountains. For myself, for..." His voice trails off.
                "Then I found a tree during a trading journey. By the time I
                returned home, something had changed. The house I was building
                seemed... insufficient."
              </p>

              <p>
                Ravi shows Kai the intricate wood carving tools he still
                carries, their edges now dulled from disuse. "I was known for my
                work once," he says, voice distant with memory. "People would
                travel from three cities away to commission pieces." He traces
                the designs etched into the handles—flowing patterns that speak
                of a steady hand and patient attention.
              </p>

              <p>
                "Do you ever think of going back?" Kai asks. "To your workshop?"
              </p>

              <p>
                Ravi's laugh holds no humor. "Every day. And never." He gestures
                toward the horizon. "My brother still writes to me. Says my
                apprentice took over the commissions, that there's still a place
                for me." His fingers spasm slightly. "But I wouldn't be the
                master craftsman returning. I'd be... this." He indicates his
                trembling hands, his gaunt frame.
              </p>

              <p>
                That night, beneath stars that wheel indifferently overhead, Kai
                makes the first of many vows: Never again.
              </p>

              <p>Three days later, he breaks it.</p>

              <p>
                The next morning, the emptiness behind his breastbone expands to
                fill his entire chest. His hands shake. Sweat soaks his sleeping
                mat despite the desert's cold dawn. He knows a tree stands half
                a day's journey west. He closes his eyes, counts his breaths,
                focuses on the precise arrangement of stones around his
                campfire.
              </p>

              <p>
                For six hours, he maintains rigid control. He completes his
                morning routine with exacting precision—each movement
                deliberate, each task executed flawlessly.
              </p>

              <p>
                At midday, he falters. Not a deliberate choice, but a moment of
                inattention. His path, carefully planned to avoid the western
                route, shifts almost imperceptibly. By afternoon, he stands
                beneath the tree, mouth already filling with anticipation.
              </p>

              <p>
                That evening, he sits with his back to a rock, stomach distended
                with fruit, fingers sticky with juice. The shame is a living
                creature beneath his skin—hot, insistent, familiar.
              </p>

              <p>
                "Six hours," he whispers to the empty air. "Six hours of
                resistance, and now nothing to show for it."
              </p>

              <p>
                All that discipline, all that control, rendered meaningless by a
                single moment of weakness. If he couldn't maintain perfection,
                what was the point of trying at all?
              </p>

              <p className="sacred-text">
                He sleeps beneath the tree, and in the morning eats until nausea
                forces him to stop.
              </p>
            </div>
          </section>

          {/* Part III */}
          <section id="part-3" data-part="part-3" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="heading-xl mb-4 text-purple-300">PART III</h2>
              <h3 className="heading-lg text-slate-200">THE MIRRORS</h3>
            </div>

            <div className="prose prose-lg prose-invert max-w-none">
              <p>
                In his fourth year of seeking, during a particularly brutal
                summer, Kai collapses from exhaustion in a remote region where
                even the hardiest desert plants struggle to survive. For three
                days, he drifts in and out of consciousness, his water supply
                dwindling, the hollow place inside him screaming for fruit while
                his body cries for more basic sustenance.
              </p>

              <p>
                On the fourth day, he wakes to find a shadow falling across his
                face. A traveler stands above him, offering water from a skin
                that bears unfamiliar markings. Kai drinks with desperate
                gratitude, the liquid cooler than seems possible in this
                relentless heat.
              </p>

              <p>
                As his vision clears, he studies his rescuer. The man appears to
                be in his fourth or fifth decade, his face neither young nor old
                but containing elements of both. He moves with a fluid grace
                that suggests years of desert travel, yet there is nothing
                weathered or hardened about him.
              </p>

              <p>
                "You pushed too far," the man observes, his voice neither
                judging nor sympathetic. "The distance between wells here is
                greater than maps indicate."
              </p>

              <p>
                Kai nods weakly, unable to explain that he hasn't been following
                well patterns but the whispered location of a legendary tree
                said to bear fruit with flesh the color of sunset.
              </p>

              <p>
                The man introduces himself as Nasir and offers to share his camp
                until Kai regains strength. As they walk slowly toward a cluster
                of rocks that provides meager shade, Kai notices something
                strange: Nasir carries no tension in his body, no desperate
                energy in his movements. Most striking of all, he passes a small
                fruit tree without a second glance, not even acknowledging its
                existence.
              </p>

              <p>
                "You don't seek the fruit," Kai says that evening as they sit
                slightly apart from Nasir's small cooking fire.
              </p>

              <p>The man looks at him with gentle curiosity. "Should I?"</p>

              <p>
                The question is so simple, so free of the assumption that has
                governed Kai's existence for years, that he finds himself
                momentarily speechless.
              </p>

              <p>
                "Most people do," Kai manages finally, adjusting the calibration
                on a small sundial he'd begun absently constructing from sticks
                and stones—an old habit from his engineering days. "Once they've
                tasted it."
              </p>

              <p>
                "I've tasted it," Nasir says, watching Kai's hands with
                interest. "Many years ago. It was pleasant enough."
              </p>

              <p>"Just... pleasant?"</p>

              <p>"What else should it have been?"</p>

              <p>
                Kai struggles to articulate what has become his central truth.
                "It fills the emptiness. For a moment."
              </p>

              <p>
                "Ah." Nasir nods slowly. "And what emptiness would that be?"
              </p>

              <p>
                The question strikes Kai like a physical blow. He has never
                tried to define the hollow place, never examined its contours or
                questioned its origin. It has simply been there, as fundamental
                as breathing.
              </p>

              <p>
                "I don't know," he admits, his hands stilling on the makeshift
                sundial. "It's just... there. A void that needs filling."
              </p>

              <p>
                Nasir pokes at the small fire with a stick, sending sparks
                spiraling upward. "Before you found the fruit, what did you try
                to fill it with?"
              </p>

              <p>
                The question opens a door to memories Kai has kept carefully
                closed. "Achievement. Recognition. I was designing water
                management systems at the University. Everyone said the work was
                brilliant." He laughs without humor. "I walked away before
                completion. As usual."
              </p>

              <p>"And before that?"</p>

              <p>
                "Relationships. Each one intense, each one abandoned when it
                became too..." Kai searches for the word.
              </p>

              <p>"Real?" Nasir offers.</p>

              <p>Kai nods, surprised by the accuracy.</p>

              <p>
                "And now the fruit." Nasir's voice holds no judgment. "Different
                substances, same pattern."
              </p>

              <p>
                They sit in silence as the fire dies down to embers. In the
                darkness between their shelters, Nasir's hand finds Kai's face.
                Their encounter is unlike any Kai has known—neither desperate
                nor calculated, but present and curious.
              </p>

              <p>
                Afterward, as Nasir sleeps beside him, Kai watches the rise and
                fall of his chest. Not the desperate clinging he had felt after
                being with Senna. Not the analytical distance that had colored
                his time with Jana. Something else—appreciation without the need
                to transform the experience into something more significant than
                it was.
              </p>

              <p>
                Morning brings a subtle shift in Nasir's demeanor. He prepares a
                simple meal, offers water, suggests routes Kai might take now
                that his strength is returning. All practical, all present, yet
                somehow containing a gentle distancing.
              </p>

              <p>"You're continuing west," Kai observes.</p>

              <p>Nasir nods. "And you?"</p>

              <p>
                Kai realizes he doesn't know. The pull toward the legendary tree
                has diminished, though not disappeared entirely. "East, I
                think."
              </p>

              <p>
                "May I offer something before we part?" Nasir asks. When Kai
                nods, he continues: "You're not seeking fruit. You're seeking to
                escape the hollow place. But what if that place isn't something
                to escape? What if it's just part of being alive?"
              </p>

              <p>
                They part with simple acknowledgment—a hand on shoulder, a brief
                meeting of eyes. No promises. No drama. Just the recognition of
                a complete encounter that requires no continuation.
              </p>

              <p>
                As Kai watches Nasir's figure diminish against the western
                horizon, something stirs within him—not the hollow hunger for
                fruit, but a different kind of questioning:
              </p>

              <p className="sacred-text">
                What if the fruit was never the problem?
              </p>

              <p>
                The question takes root, growing alongside Kai's continued
                seeking. He still tracks the trees, still consumes the fruit
                with desperate need, but something has shifted. A small distance
                has opened between himself and his actions, a space from which
                he can observe his own compulsion.
              </p>

              <p>
                This awareness grows slowly, like a desert plant. Some days it
                withers in the heat of his craving. Other days, it reaches
                toward understanding.
              </p>

              <p>
                He begins to apply his engineering mind not just to finding
                fruit, but to understanding the pattern of his seeking. He
                notices the trajectory: the initial relief, followed by the
                intensified emptiness, followed by the desperate search for the
                next tree. He maps this curve mentally, recognizing its
                mathematical consistency. The problem isn't that the system is
                faulty; it's working exactly as designed. The flaw is in what he
                expects it to provide.
              </p>

              <p>
                He begins to notice parallels between his seeking and other
                patterns in the desert. How traders fixate on particularly
                valuable goods, speaking of them with the same intensity he
                reserves for the fruit. How some travelers structure their
                entire journeys around visiting certain oases known for their
                beauty, only to arrive and immediately begin planning for the
                next landmark. How young men and women pursue potential partners
                with a desperation that transforms the object of desire into
                something symbolic rather than human.
              </p>

              <p>
                The void, he realizes, is not unique to fruit seekers. It speaks
                in many languages.
              </p>

              <p>
                One evening at a trading post, Kai encounters a small group
                gathered around a charismatic speaker. Maro's voice carries
                across the courtyard, his words measured and forceful as he
                addresses the circle of listeners.
              </p>

              <p>
                "I walked in darkness for seven years," Maro proclaims, his hand
                gesturing expressively. "The fruit controlled every aspect of my
                existence. But through moral strength and discipline, I broke
                its hold."
              </p>

              <p>
                Kai watches from the periphery, noting how Maro's followers nod
                eagerly at each pronouncement. Most wear similar expressions—a
                combination of admiration and anxious attentiveness, as if their
                own recovery depends on absorbing every word.
              </p>

              <p>
                "The weak-willed succumb," Maro continues. "They lack the moral
                fiber to resist temptation. But each of you has the potential
                for strength." His eyes move across his audience, briefly
                catching Kai's before dismissing him. "The path to freedom
                requires absolute commitment."
              </p>

              <p>
                Later, as the group disperses, Kai observes Maro alone. The
                charismatic certainty falls away, replaced by something more
                complex. When a fruit-laden tree comes into view at the edge of
                the settlement, Maro's steps falter momentarily. His hand
                reaches slightly toward it before he catches himself, turning
                the movement into an adjustment of his robe.
              </p>

              <p>
                His recovery narrative, Kai realizes, has become another kind of
                fruit—another external solution to the hollow place, another
                identity to cling to.
              </p>

              <p>
                A messenger finds Kai at a remote well, three years after he
                ignored Professor Amina's letter. The young woman carries the
                emblem of the University on her sleeve.
              </p>

              <p>
                "You're difficult to locate," she says, handing him a sealed
                tube. "Professor Amina insisted this reach you personally."
              </p>

              <p>
                The tube contains plans, not a letter. Detailed drawings of his
                water prediction system, modified and implemented. Notes in
                Neel's handwriting indicate adaptations made to compensate for
                the flaws Kai couldn't resolve.
              </p>

              <p>
                A single line from Amina:{" "}
                <em>It works, but not perfectly. It saves lives anyway.</em>
              </p>

              <p>
                Something cracks inside Kai—not the hollow place expanding, but
                a rigid belief system fracturing. The belief that only
                perfection warranted completion. That flawed creation was worse
                than abandoned potential.
              </p>

              <p>
                He unrolls the plans, tracing the modifications with fingertips
                suddenly sensitive to every mark on the parchment. His
                engineer's mind sees immediately where Neel had compromised,
                where elegant theory had surrendered to approximation. Not
                perfect. Not even close. Just accurate enough to tell villages
                when to conserve water, when to dig deeper, when to move.
                Nothing more.
              </p>

              <p>
                For the first time in years, he removes Neel's message tube from
                the bottom of his pack. The seal breaks with a sound like
                distant thunder. It contains not only the flow calculation
                modifications he'd expected but a brief note:{" "}
                <em>
                  If you ever get tired of being the tragic genius who walked
                  away, there's practical work waiting for you. Imperfect,
                  essential work.
                </em>
              </p>

              <p>
                Kai tucks both tubes back into his pack. That night, when he
                encounters a fruit tree, he passes it without stopping.
              </p>

              <p>
                The next morning, fruit hunger wakes him before dawn, his body
                demanding what it has come to expect. The hollow place beneath
                his ribs expands to fill his entire chest. His hands shake.
                Sweat soaks his sleeping mat despite the desert's cold dawn.
              </p>

              <p>
                For three hours, he maintains rigid control, completing his
                morning routine with exacting precision—each movement
                deliberate, each task executed flawlessly.
              </p>

              <p>
                Then his path shifts almost imperceptibly. By midday, he stands
                beneath a tree, mouth already filling with anticipation.
              </p>

              <p>
                That evening, he sits with his back to a rock, stomach distended
                with fruit, fingers sticky with juice. The shame is a living
                creature beneath his skin—hot, insistent, familiar.
              </p>

              <p>
                "Three hours," he whispers to the empty air. "Three hours of
                resistance, and now nothing to show for it."
              </p>

              <p>
                All that discipline, all that control, rendered meaningless by a
                single moment of weakness. If he couldn't maintain perfection,
                what was the point of trying at all?
              </p>

              <p>
                The pattern breaks, then reasserts itself. Progress isn't
                linear.
              </p>

              <p>In the season of gentle rain, Kai encounters Elian.</p>

              <p>
                Their first meeting occurs at a crossroads trading post where
                desert travelers exchange news and supplies. Kai notices him
                immediately—not because he is striking, though he is, but
                because of how he moves through the crowded market. While others
                push and jostle, Elian seems to find spaces that have always
                existed, his movements flowing around obstacles rather than
                confronting them.
              </p>

              <p>
                When their paths intersect, Elian smiles—a brief expression that
                contains no expectation or demand. Their conversation begins
                with practical matters—water sources, weather patterns, the
                quality of goods at the trading post. Only gradually does it
                shift to more personal terrain.
              </p>

              <p>
                "You're watching how the light enters this place," Elian
                observes, noticing Kai's attention to the trading post's
                construction. "Looking at the beams?"
              </p>

              <p>
                Kai nods, surprised to be caught in his old habit. "The support
                system is clever. Minimal materials, maximum stability."
              </p>

              <p>
                Elian is traveling east to study with a renowned glass artist.
                The practicality of this purpose surprises Kai, who has come to
                expect either aimless wandering or fruit-seeking from those he
                meets.
              </p>

              <p>
                "You have a destination," Kai observes. "A specific purpose."
              </p>

              <p>
                Elian adjusts the strap of his pack. "I have a direction," he
                corrects. "The purpose reveals itself in the moving toward it."
              </p>

              <p>
                They share a meal of dried meat and bread, their shoulders
                occasionally brushing in the crowded eating house. Each contact
                sends a current through Kai that has nothing to do with the
                fruit's promise—a different kind of hunger, equally powerful but
                somehow cleaner.
              </p>

              <p>
                When Kai mentions his own journey has no fixed destination,
                Elian nods without judgment. "Perhaps we could travel together
                for a while. My path eastward is flexible in its exact route."
              </p>

              <p>
                They leave the trading post together the following morning. The
                rhythm of travel with Elian is unlike anything Kai has
                experienced—neither the desperate seeking of fruit hunters nor
                the rigid discipline of traders. Elian moves with purpose but
                remains attentive to whatever appears in his path, whether a
                particular configuration of rocks or the sudden flight of desert
                birds.
              </p>

              <p>
                On their third day together, they encounter a fruit tree. Kai
                feels the familiar pull immediately, his body responding before
                his mind registers what he is seeing. He stops, aware of Elian
                watching him.
              </p>

              <p>
                "Go ahead," Elian says, his voice neutral. "I'll prepare camp
                nearby."
              </p>

              <p>
                Kai approaches the tree alone, conflicting impulses warring
                within him. The fruit hangs heavy and inviting, promising the
                familiar cycle of fulfillment and emptiness. Yet for the first
                time, he hesitates not from restraint but from genuine
                uncertainty.
              </p>

              <p>
                He takes one piece and returns to where Elian is unrolling
                sleeping mats. They sit in companionable silence as the sun
                begins its descent. The fruit remains untouched in Kai's hand,
                growing warm from his body heat.
              </p>

              <p>"You're not going to eat it?" Elian asks eventually.</p>

              <p>"I'm not sure," Kai admits.</p>

              <p>
                Elian nods as if this makes perfect sense. "Then don't decide
                yet."
              </p>

              <p>
                They prepare a simple meal. They speak of Elian's training as a
                glass artist, of the desert's changing light, of distant cities
                neither has visited. The fruit sits beside Kai, present but not
                commanding his attention.
              </p>

              <p>
                "I used to design water management systems," Kai finds himself
                saying as they watch the stars emerge. "Complex models for
                predicting drought cycles."
              </p>

              <p>"Used to?" Elian asks.</p>

              <p>
                "I left before the project was completed." Kai waits for the
                familiar justifications to emerge—how the work was becoming too
                constrained, how he needed freedom, how institutions stifled
                creativity. Instead, something simpler and more honest emerges.
                "I was afraid."
              </p>

              <p>"Of failure?"</p>

              <p>
                "Of having created something definite. Something that could be
                judged. As long as it remained potential rather than actual, it
                could be perfect."
              </p>

              <p>
                Elian considers this. "My teacher says the fear of making
                mediocre art keeps many from making any art at all."
              </p>

              <p>
                "Then why glass?" Kai asks, before he can stop himself. "It
                seems... unforgiving. One mistake and it all falls apart."
              </p>

              <p>
                Elian laughs, not unkindly. "Exactly. You can't pretend. If the
                glass bubbles, if it cracks — you see it. Everyone sees it."
              </p>

              <p>
                He shrugs. "You can either call it failure and walk away... or
                learn how to shape the cracks into something worth keeping."
              </p>

              <p>
                The next afternoon, they stop at a small settlement where a
                glassblower has set up a temporary workshop. Elian asks
                permission for them to observe, and the artisan agrees with a
                gruff nod.
              </p>

              <p>
                For hours, they watch as he gathers molten glass on a metal rod,
                turning it continuously as he shapes it with tools and breath.
                His movements are precise, economic, focused entirely on the
                transforming material.
              </p>

              <p>
                At one point, he creates a delicate vase with a flared rim. As
                he's making the final adjustments, the rim develops a crack. Kai
                expects him to discard the piece and start again. Instead, the
                glassblower studies the crack for a moment, then deliberately
                extends it, transforming it into a decorative pattern that wraps
                around the vessel's neck.
              </p>

              <p>
                "You incorporated the flaw," Elian observes when the piece has
                cooled.
              </p>

              <p>
                The glassblower shrugs. "The crack's part of the piece now.
                Sometimes the glass decides what it wants to be."
              </p>

              <p>
                Later, as they walk away from the settlement, Elian says,
                "That's what my teacher means about shaping the cracks."
              </p>

              <p>
                Kai nods, suddenly aware of the uneaten fruit still in his pack.
                He removes it, studies it for a moment, then deliberately places
                it on a rock beside the path. Neither discarding nor consuming
                it, but simply setting it apart from himself.
              </p>

              <p>
                As night deepens around them, their conversation gives way to
                silence, then to a different kind of communication. Elian's
                hands find Kai's face in the darkness, tracing its contours with
                deliberate attention.
              </p>

              <p>
                Later, as Elian sleeps beside him, Kai notices the change in his
                own breathing—deeper, less guarded. The hollow place remains.
                But for the first time, Kai can imagine it not as an adversary
                to be conquered but as a creation of his own making. A shape he
                has avoided so thoroughly that it has come to feel like destiny
                rather than choice.
              </p>

              <p>
                Elian stays with him for twenty-eight days. Their journey takes
                a winding path eastward, neither hurrying nor delaying,
                responsive to the terrain and to each other. They encounter
                three more fruit trees during this time. At each one, Kai's
                response is different—once eating with conscious attention, once
                passing by without stopping, once sitting beneath the branches
                without reaching for the fruit at all.
              </p>

              <p>
                One evening beside a small fire, Elian attempts to recreate a
                glass-blowing technique using heated sand. The result is
                absurdly misshapen, nothing like his intention. He holds it up
                to the firelight, examining it with exaggerated seriousness.
              </p>

              <p>"Behold," he announces, "my masterpiece."</p>

              <p>
                Something breaks loose in Kai—not the hollow place expanding,
                but a rigidity he hadn't known he carried. He laughs, first
                quietly, then with increasing abandon until tears stream down
                his face.
              </p>

              <p>
                "I haven't laughed like this in..." He can't remember how long.
              </p>

              <p>
                "You look ridiculous when you laugh," Elian observes, which only
                makes Kai laugh harder.
              </p>

              <p>
                "We're both ridiculous," Kai manages between gasps. "Wandering
                around this indifferent desert, taking ourselves so seriously."
              </p>

              <p>
                "Speak for yourself," Elian says with mock dignity. "I'm on an
                important artistic pilgrimage."
              </p>

              <p>
                They dissolve into laughter again. When it finally subsides, Kai
                feels lighter than he has in years—the hollow place still there
                but momentarily irrelevant, like a chronic pain forgotten during
                intense pleasure.
              </p>

              <p>
                On the twenty-ninth day, they reach a point where the desert
                gives way to rockier terrain leading toward the mountains.
                Elian's destination lies directly eastward. Kai, scanning the
                horizon, feels drawn southward toward a region he has never
                explored.
              </p>

              <p>
                "This is where we part," Elian says, his voice carrying neither
                sadness nor detachment, simply recognition.
              </p>

              <p>
                Kai nods, surprised by the lack of desperation he feels. Their
                connection has been profound without becoming another form of
                seeking, intense without creating dependency.
              </p>

              <p>"What will you seek in the south?" Elian asks.</p>

              <p>
                Kai considers the question. For years, the answer would have
                been automatic—the fruit, of course. Now he finds himself
                saying, "I'm not entirely sure. Something is calling me there."
              </p>

              <p>
                Elian smiles. "That's as good a reason as any." He reaches out,
                his hand warm against Kai's cheek. "May your journey bring you
                what you need, whether or not it's what you seek."
              </p>

              <p>
                They hold each other one final time, a complete embrace that
                requires no elaboration or promise of reunion. Then Elian
                continues eastward, his figure gradually becoming smaller
                against the mountain backdrop until distance absorbs him
                entirely.
              </p>

              <p>
                Kai turns southward, aware of a curious lightness in his
                movements. The hollow place is still there. But now it feels
                less like a wound and more like a particular shape of
                awareness—a vessel capable of holding experience without
                demanding it be of a certain kind.
              </p>

              <p>
                As Kai walks, memory returns—not as haunting regret but as
                simple acknowledgment. The engineering project abandoned. The
                succession of lovers left behind. The family whose expectations
                he had fled. All the moments when the hollow place had seemed
                too threatening to face directly.
              </p>

              <p>
                <em>Neel would laugh at this,</em> he thinks suddenly. His
                oldest friend who had seen every iteration of his brilliance and
                subsequent flight. Who had named the pattern when Kai himself
                couldn't see it.
              </p>

              <p>
                For the first time in years, Kai feels a pull toward something
                other than the fruit. Not the hollow place demanding to be
                filled, but a genuine curiosity: What had become of his work?
                His colleagues? The people he had left behind?
              </p>
            </div>
          </section>

          {/* Part IV */}
          <section id="part-4" data-part="part-4" className="mb-20">
            <div className="text-center mb-12">
              <h2 className="heading-xl mb-4 text-purple-300">PART IV</h2>
              <h3 className="heading-lg text-slate-200">THE SACRED POTATO</h3>
            </div>

            <div className="prose prose-lg prose-invert max-w-none">
              <p>
                The southern route brings Kai to a village he hasn't visited
                before—a cluster of stone buildings around a surprisingly
                abundant well. As he approaches the central square, he notices a
                small crowd gathered around what appears to be a demonstration.
              </p>

              <p>
                "The principle is simple," a familiar voice explains. "The depth
                sensors record changes in the water table, feeding data to the
                central calculation matrix."
              </p>

              <p>
                Kai freezes, then slowly moves closer. Neel stands in the center
                of the group, pointing to a complex apparatus extending into the
                well. Older now, hair threaded with gray, but unmistakable. The
                diagrams he's using to explain the system are simplified
                versions of Kai's original designs, adapted for practical
                implementation.
              </p>

              <p>
                "The matrix identifies patterns that human observation might
                miss," Neel continues. "Allowing us to predict—"
              </p>

              <p>
                He stops mid-sentence, eyes fixing on Kai at the edge of the
                crowd. For a long moment, neither man moves. Then Neel's face
                breaks into a crooked smile.
              </p>

              <p>"Well," he says. "Look what the desert dragged in."</p>

              <p>
                Later, in the village's small eating house, they sit across from
                each other in silence that begins as awkward but gradually
                softens into something more complex.
              </p>

              <p>"You implemented the system," Kai finally says.</p>

              <p>
                Neel nods. "With Amina. And others." He tears a piece of bread,
                studying it with unusual intensity. "It works. Not perfectly.
                Better than nothing."
              </p>

              <p>"I got the message. Eventually."</p>

              <p>
                "And yet you're here, not there." No accusation in Neel's voice,
                just observation.
              </p>

              <p>
                Kai considers possible answers—explanations, justifications, the
                familiar pattern of articulate evasion. Instead, he says simply:
                "I ran away."
              </p>

              <p>"Yes." Neel meets his eyes. "You always do."</p>

              <p>"I'm getting better at noticing it."</p>

              <p>
                "Progress, I suppose." Neel takes a drink from his cup. "We're
                installing monitoring stations across the southeastern region.
                The Three Cities drought has stabilized, but smaller communities
                are still vulnerable." He hesitates. "We could use someone who
                understands the original design architecture."
              </p>

              <p>
                Kai feels the familiar tightening in his chest—the pressure of
                expectation, the fear of committing to something he might not
                complete perfectly. The hollow place expanding in anticipation
                of inevitable disappointment.
              </p>

              <p>
                "I'm not the same person who designed that system," he says
                carefully.
              </p>

              <p>
                "Good," Neel replies. "That person was brilliant but impossible.
                I like this one better already."
              </p>

              <p>
                They part the next morning with tentative plans to meet at the
                University in the autumn. No promises. No guarantees. Just a
                possibility neither embraces nor rejects completely.
              </p>

              <p>
                After Neel leaves, Kai drifts southward again, feeling the
                familiar pull of the open horizon. But something in him has
                shifted, almost imperceptibly.
              </p>

              <p>The hollow place is still there, but quieter.</p>

              <p>
                He moves not with urgency, but with a kind of wary curiosity,
                following paths without demanding answers.
              </p>

              <p>
                One afternoon, he comes across a small plant growing from a
                crack in a rock face where nothing should be able to take root.
                He pauses to study it—the ordinary miracle of life persisting
                where it seems impossible. Something about its humble tenacity
                stays with him as he continues walking.
              </p>

              <p>The desert stretches ahead: vast, patient, indifferent.</p>

              <p>
                In his seventh year of desert travel, Kai encounters a woman who
                moves through the landscape with remarkable grace. She appears
                to be in her sixth or seventh decade, her skin mapped with lines
                that speak of years under the desert sun, yet she carries her
                pack with ease, her steps measured and unhurried.
              </p>

              <p>
                What strikes him immediately is her presence—fully occupied with
                each action, whether adjusting her headscarf against the sun or
                sipping water from her clay cup. No part of her seems to be
                elsewhere, planning or remembering or seeking.
              </p>

              <p>
                "You've never been caught by the fruit," Kai says when they have
                exchanged the customary greetings.
              </p>

              <p>
                Sienna studies him with eyes the color of amber. "What makes you
                say that?"
              </p>

              <p>
                "The way you move. The way you focus." He gestures vaguely.
                "Fruit seekers are always partially elsewhere."
              </p>

              <p>
                She nods, accepting his observation. "The fruit has never
                particularly called to me, though I've watched many succumb to
                its promise."
              </p>

              <p>
                Kai feels a familiar surge of envy followed by skepticism.
                "You've never felt that void? That sense that something
                essential is missing?"
              </p>

              <p>
                "I've known voids," she says, arranging small stones in a
                pattern beside her. "But I learned early to question whether
                anything external could truly fill them."
              </p>

              <p>
                As the afternoon stretches into evening, Kai finds himself
                telling Sienna his story—the first tree, the momentary relief,
                the years of seeking, the encounter with Neel, his tentative
                plans to return to the University. She listens without judgment,
                her attention complete in a way he finds both unsettling and
                compelling.
              </p>

              <p>
                "How did you avoid it?" he asks when his story is finished. "The
                trap that caught so many of us?"
              </p>

              <p>
                Sienna is quiet for a long moment, continuing to arrange her
                stones in a pattern that seems both random and purposeful. "When
                I was very young," she begins, "I watched my father destroy
                himself seeking water mirages. By the time I was old enough to
                travel alone, I understood something essential about desire—that
                most of what we chase is merely a projection of what we believe
                we lack."
              </p>

              <p>
                She picks up one of her small stones, rolling it between her
                fingers. "There's a difference between hunger and craving.
                Hunger comes from the body's true needs. Craving comes from the
                mind's confusion." She places the stone in his palm. "Feel the
                weight of this. Its texture. Its temperature changing as it
                absorbs your body's heat. This is reality. The fruit you seek
                exists, but what you believe it can give you is a mirage."
              </p>

              <p>
                Kai holds the stone, feeling its solid presence. "So the answer
                is to focus on what's real? Physical sensations? The present
                moment?"
              </p>

              <p>
                Sienna laughs, the sound unexpectedly light. "That's just
                another fruit. Another system to perfect. Another identity to
                adopt." She reaches into her pack and pulls out several small
                tubers—ordinary root vegetables gathered from some unseen
                garden. She begins to clean them, her movements unhurried yet
                precise.
              </p>

              <p>
                "Has it occurred to you," she says as she works, "that you might
                be taking all of this far too seriously?"
              </p>

              <p>
                The question catches him off guard. "My seeking has consumed
                years of my life. It's destroyed my health, my work, my
                relationships. That seems serious enough."
              </p>

              <p>
                "Oh, it's all quite serious," she agrees, her tone suggesting
                the opposite. "Terribly serious business, being human. All that
                seeking and suffering and striving." She holds up one of the
                tubers, studying it with unexpected reverence. "But here's the
                joke no one tells you: you're just a potato."
              </p>

              <p>
                "A... potato?" Kai finds himself caught between irritation and
                unexpected curiosity.
              </p>

              <p className="sacred-text text-xl">
                "A sacred potato," she clarifies, her eyes twinkling. "A
                consciousness experiencing itself through this particular form
                for a brief moment. Capable of profound joy and terrible
                suffering. Completely ordinary and utterly miraculous."
              </p>

              <p>
                Kai feels a strange mixture of irritation and curiosity. "That's
                your wisdom? I'm a potato?"
              </p>

              <p>
                "A sacred potato," she corrects again, emphasizing the word with
                gentle humor. "An awareness that has convinced itself it's a
                separate self with a particular story about what it lacks. Your
                hollow place isn't something to fill or transcend or analyze.
                It's just part of the particular shape your potato-ness has
                taken."
              </p>

              <p>
                Despite himself, Kai feels laughter bubbling up—unexpected and
                genuine. There's something absurdly perfect about the image. All
                his years of seeking, all his elaborate self-narratives, all his
                desperate attempts to fill the hollow place... and he's just a
                potato taking itself too seriously.
              </p>

              <p>
                "So what does a sacred potato do about the hollow place?" he
                asks, surprised by the lightness in his voice.
              </p>

              <p>
                Sienna shrugs. "Whatever it wants. Fill it sometimes. Leave it
                empty sometimes. Examine it. Ignore it. None of it matters
                particularly, except in how it shapes your experience of being
                alive right now."
              </p>

              <p>
                She continues preparing the meal, cutting the vegetables with
                the same care she might give to rare spices or precious fruit.
                "Besides," she adds, "if we were perfect, complete, lacking
                nothing... what a boring existence that would be. No seeking, no
                finding, no losing, no laughing at the cosmic joke of it all."
              </p>

              <p>
                "That's either profound wisdom or complete nonsense," Kai says.
              </p>

              <p>
                "Why not both?" Sienna's laugh lines deepen. "The truly wise are
                always a little bit foolish. The truly foolish occasionally
                stumble into wisdom."
              </p>

              <p>
                That night, they lie beside the same fire but apart, each
                wrapped in their own blankets. The space between them is neither
                barrier nor invitation—simply the natural distance between two
                complete beings.
              </p>

              <p>
                In the morning, Sienna continues her journey northward. Kai
                watches her go, struck by the complete absence of drama in their
                parting. She simply goes. He simply remains. Nothing is missing
                from this exchange.
              </p>

              <p>
                Over the coming months, the phrase "sacred potato" returns to
                him at unexpected moments. Sometimes he laughs aloud at the
                absurdity of it. Sometimes he tries to dismiss it as an old
                woman's eccentricity. Once, after a particularly difficult day
                of travel, he finds himself muttering "sacred potato problems"
                as he struggles to light a fire in damp conditions. The phrase
                breaks his concentration, sends him into unexpected laughter
                that releases the tension he's been carrying.
              </p>

              <p>
                At a trading post, he attempts to explain the concept to a young
                fruit-seeker. The words come out differently than Sienna's—less
                philosophical, more practical, shaped by his own experience. The
                seeker looks confused, but something in Kai's laughter seems to
                reach him more than the words themselves.
              </p>

              <p>
                The phrase becomes not a philosophy to follow but a creation to
                play with—a lens through which to view both his suffering and
                his joy with slightly less desperate seriousness.
              </p>

              <p>
                One morning in his ninth year of desert travel, camped near a
                magnificent tree laden with particularly vibrant fruit, Kai
                wakes from a dream he can't remember but that leaves him with a
                lingering sense of significance. The eastern sky is beginning to
                lighten, stars still visible in the deeper blue above.
              </p>

              <p>
                Something about the quality of silence draws him fully into
                wakefulness. Not the ordinary silence of early morning, but a
                silence that seems to contain all sounds within it—the faint
                stirring of wind, the distant call of a desert bird, his own
                breath moving in and out.
              </p>

              <p>
                He sits up, aware of each vertebra in his spine aligning, the
                cool air against his skin, the slight stiffness in his shoulders
                from sleeping on hard ground. Every sensation arrives with
                unusual clarity, as if he is experiencing them for the first
                time.
              </p>

              <p>
                Without conscious decision, he rises and walks to the tree. Its
                fruits hang like jewels, catching the first suggestion of
                sunlight. Kai stands before it, neither reaching for the fruit
                nor turning away.
              </p>

              <p>
                The tree is simply a tree—neither salvation nor temptation. The
                sand beneath his feet is simply sand. The breath moving through
                his body is simply breath. Each element complete in itself,
                requiring nothing beyond its own existence.
              </p>

              <p>
                In this moment of complete attention, something extraordinary
                happens, so simple it almost escapes notice: Kai laughs. Not the
                bitter laugh of his seeking years or the calculated laugh of
                social interaction, but the genuine laughter of recognition. The
                cosmic joke suddenly apparent.
              </p>

              <p>
                All these years of desperate seeking, of elaborate philosophical
                frameworks, of systems and explanations and narratives—and here
                he stands, just a consciousness experiencing a tree at dawn. A
                sacred potato indeed, taking itself terribly seriously while the
                universe unfolds with complete indifference to his drama.
              </p>

              <p>
                The hollow place doesn't disappear. It simply becomes another
                feature in the landscape of his experience—neither defining nor
                irrelevant, just present like the sky or the sand or his breath.
              </p>

              <p>
                Kai reaches up and picks a fruit from the lowest branch. Not
                from hunger or need or desperate hope, but as a gesture of
                acknowledgment. He studies its color and texture with
                appreciation, then raises it to his lips.
              </p>

              <p>
                The taste is exactly as it has always been—sweet, complex,
                pleasant. Nothing more, nothing less. The fruit is just fruit.
                Extraordinary in its ordinariness.
              </p>

              <p>
                He places the partially eaten fruit at the base of the tree, a
                quiet offering of gratitude, and turns back toward his camp. The
                desert stretches before him, vast and indifferent, filled with
                challenges and beauties he has only begun to perceive.
              </p>

              <p>
                As he gathers his belongings, Kai's thoughts turn to the
                University, to his abandoned work, to Neel and their tentative
                plans to meet in the autumn. For the first time in years, these
                thoughts bring neither shame nor justification but simple
                curiosity. What would happen if he returned, not as the
                brilliant mind who must create perfection, but as the sacred
                potato willing to create something flawed but actual?
              </p>

              <p>
                The thought brings both terror and exhilaration. The hollow
                place stirs in response, but now its voice is simply one among
                many—no longer commanding the full attention of his being.
              </p>

              <p>
                The University will still be there. Or it won't. Either way, the
                decision doesn't need to be perfect, final, or all-encompassing.
                Just the next step of a sacred potato making its way through the
                world.
              </p>

              <p>
                As he walks, Kai notices the shapes of clouds gathering on the
                western horizon—perhaps rain, perhaps just the promise of it. He
                adjusts his pack, feeling its weight settle comfortably across
                his shoulders, and keeps moving.
              </p>

              <p>
                The desert is older than language. It will continue long after
                he is gone. This simple truth brings him comfort as he walks,
                feet pressing into sand that shifts just enough to remind him
                that nothing here is truly solid.
              </p>

              <p>
                Nothing permanent. Nothing missing. Nothing extra. Just this—a
                sacred potato experiencing the present moment in all its
                ordinary magnificence.
              </p>

              <p className="sacred-text text-xl">
                Kai adjusts his head covering against the strengthening sun and
                continues walking, laughing quietly at the cosmic joke of his
                own existence.
              </p>
            </div>
          </section>

          {/* Reflection */}
          <section className="mt-20 pt-12 border-t border-white/10">
            <div className="text-center">
              <div className="text-5xl mb-8 animate-float">🥔</div>
              <div className="sacred-quote max-w-2xl mx-auto">
                "Sometimes consciousness is a potato taking itself too
                seriously, forgetting it is earth experiencing the cosmic joke
                of its own existence."
              </div>
              <p className="text-sm text-slate-400 mt-6">— The Sacred Potato</p>
            </div>
          </section>
        </div>
      </article>

      {/* Navigation Footer */}
      <section className="py-16">
        <div className="container-narrow">
          <div className="contemplative-card p-8 text-center">
            <h3 className="heading-lg mb-6">Continue the Journey</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/soul/writing" className="gentle-button">
                ← More Writing
              </Link>
              <Link href="/soul/journey" className="gentle-button">
                See the Larger Vision
              </Link>
              <Link href="/soul/connect" className="gentle-button">
                Share Your Thoughts
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-30"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      {/* Footer */}
      <footer className="py-16 border-t border-white/5">
        <div className="container-content text-center">
          <div className="flex justify-center mb-6">
            <Image
              src="/logo-symbol.png"
              alt="Ahiya"
              width={24}
              height={24}
              className="opacity-40"
            />
          </div>
          <p className="text-slate-400 text-sm mb-4">
            Made with reverence by <span className="text-gentle">Ahiya</span>
          </p>
          <p className="text-slate-500 text-xs">
            © {new Date().getFullYear()} - A space becoming human becoming space
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SacredPotatoPage;
