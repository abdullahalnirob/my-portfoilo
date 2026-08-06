'use client'

import Link from 'next/link'
import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { scrollToSection } from '@/app/utils/scrollTo'

gsap.registerPlugin(ScrollTrigger)

interface NavLinkProps {
    href: string
    children: string
    onClick?: () => void
}

const NavLink = ({ href, children, onClick }: NavLinkProps) => {
    const linkRef = useRef<HTMLAnchorElement>(null)
    const letters = children.split('')

    useEffect(() => {
        const back = linkRef.current?.querySelectorAll<HTMLElement>('[data-back-letter]')
        if (back && back.length) {
            gsap.set(back, {
                skewX: 8,
            })
        }
    }, [])

    const animate = (hover: boolean) => {
        const front = linkRef.current?.querySelectorAll<HTMLElement>('[data-front-letter]')
        const back = linkRef.current?.querySelectorAll<HTMLElement>('[data-back-letter]')
        if (!front || !back || !front.length || !back.length) return

        gsap.to(front, {
            yPercent: hover ? -100 : 0,
            skewX: hover ? -8 : 0,
            duration: 0.5,
            ease: 'power3.inOut',
            stagger: hover ? 0.02 : 0.015,
            overwrite: 'auto',
        })
        gsap.to(back, {
            yPercent: hover ? -100 : 0,
            skewX: hover ? 0 : 8,
            duration: 0.5,
            ease: 'power3.inOut',
            stagger: hover ? 0.02 : 0.015,
            overwrite: 'auto',
        })
    }

    return (
        <li className='font-medium'>
            <Link
                ref={linkRef}
                href={href}
                className="block"
                onClick={(e) => {
                    scrollToSection(e, href)
                    onClick?.()
                }}
                onMouseEnter={() => animate(true)}
                onMouseLeave={() => animate(false)}
            >
                <span aria-label={children} className="relative flex overflow-hidden">
                    {letters.map((letter, i) => (
                        <span key={i} className="relative inline-block overflow-hidden">
                            <span data-front-letter className="inline-block">
                                {letter === ' ' ? '\u00A0' : letter}
                            </span>
                            <span
                                data-back-letter
                                aria-hidden
                                className="absolute top-full left-0 inline-block"
                            >
                                {letter === ' ' ? '\u00A0' : letter}
                            </span>
                        </span>
                    ))}
                </span>
            </Link>
        </li>
    )
}

const subscribeNoop = () => () => { }

const Burger = ({
    open,
    onClick,
    className = '',
    inert = false,
}: {
    open: boolean
    onClick: () => void
    className?: string
    inert?: boolean
}) => (
    <button
        type="button"
        onClick={onClick}
        inert={inert}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className={`md:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5 ${className}`}
    >
        <span
            className={`block h-0.5 w-6 bg-black transition-transform duration-300 ${open ? 'rotate-45 translate-y-2' : ''
                }`}
        />
        <span
            className={`block h-0.5 w-6 bg-black transition-opacity duration-300 ${open ? 'opacity-0' : 'opacity-100'
                }`}
        />
        <span
            className={`block h-0.5 w-6 bg-black transition-transform duration-300 ${open ? '-rotate-45 -translate-y-2' : ''
                }`}
        />
    </button>
)

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const navRef = useRef<HTMLElement>(null)
    /* Portals have no server output, so the overlay is client-only. This reports
       false while rendering on the server and true after, without a mismatch. */
    const mounted = useSyncExternalStore(subscribeNoop, () => true, () => false)

    const links = [
        { href: '#home', label: 'Home' },
        { href: '#about', label: 'About' },
        { href: '#services', label: 'Services' },
        { href: '#projects', label: 'Projects' },
        { href: '#testimonials', label: 'Testimonials' },
        { href: '#contact', label: 'Contact' },
    ]

    useEffect(() => {
        if (!navRef.current) return

        // entrance animation
        gsap.fromTo(navRef.current,
            { yPercent: -100 },
            { yPercent: 0, duration: 1.5, ease: 'power3.out', delay: 0.5 }
        )

        // hide/show navbar on scroll direction
        let lastScroll = 0
        const onScroll = () => {
            const current = window.scrollY
            if (current <= 0) {
                gsap.to(navRef.current!, { yPercent: 0, duration: 0.4, ease: 'power2.out' })
            } else if (current > lastScroll && current > 80) {
                gsap.to(navRef.current!, { yPercent: -100, duration: 0.4, ease: 'power2.in' })
            } else if (current < lastScroll) {
                gsap.to(navRef.current!, { yPercent: 0, duration: 0.4, ease: 'power2.out' })
            }
            lastScroll = current
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // menu open thakle background scroll lock
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : ''
        // ScrollSmoother runs its own scroll loop, so the overflow lock alone
        // won't hold it — it has to be paused directly.
        ScrollSmoother.get()?.paused(menuOpen)
        return () => {
            document.body.style.overflow = ''
            ScrollSmoother.get()?.paused(false)
        }
    }, [menuOpen])

    return (
        <nav ref={navRef} className='bg-white sticky top-0 z-50 flex justify-between items-center p-4 md:px-8'>
            <div>
                <Link href={"#"}>
                    <h3 className="font-semibold">Abdullah Al Nirob</h3>
                </Link>
            </div>

            {/* Desktop nav */}
            <ul className='hidden md:flex text-sm gap-5 items-center'>
                {links.map((link) => (
                    <NavLink key={link.href} href={link.href}>
                        {link.label}
                    </NavLink>
                ))}
            </ul>

            {/* Burger button - mobile only. Covered by the overlay once open, so
                it goes inert and the overlay carries its own copy on top. */}
            <Burger
                open={menuOpen}
                onClick={() => setMenuOpen((prev) => !prev)}
                className="relative z-50"
                inert={menuOpen}
            />

            {/* Mobile menu overlay.
                Portalled to <body> because ScrollSmoother transforms #smooth-content,
                which makes it the containing block for position:fixed children — nested
                here, `inset-0` would size to the whole page instead of the viewport.
                Being outside that transform also puts it above the content's stacking
                context, which is why the burger above can't reach over it. */}
            {mounted &&
                createPortal(
                    <div
                        inert={!menuOpen}
                        className={`md:hidden fixed inset-0 z-60 bg-white flex flex-col items-center justify-center gap-8 transition-opacity duration-300 ${menuOpen
                            ? 'opacity-100 pointer-events-auto'
                            : 'opacity-0 pointer-events-none'
                            }`}
                    >
                        <div className="fixed top-4 left-4 z-60">
                            <Link href={"#"} onClick={() => setMenuOpen(false)}>
                                <h3 className="font-semibold text-lg">Abdullah Al Nirob</h3>
                            </Link>
                        </div>

                        {/* Sits exactly where the nav burger does: nav is p-4, and its
                            32px row centres the button at 16px from the top and right. */}
                        <Burger
                            open
                            onClick={() => setMenuOpen(false)}
                            className="fixed top-4 right-4"
                        />

                        <ul className='flex flex-col text-2xl gap-8 items-center'>
                            {links.map((link) => (
                                <NavLink
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </ul>
                    </div>,
                    document.body
                )}
        </nav>
    )
}

export default Navbar