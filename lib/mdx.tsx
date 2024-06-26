import Link from 'next/link'
import Image from 'next/image'
import { MDXRemote } from 'next-mdx-remote'
import React from 'react'
import { highlight } from 'sugar-high'
import { slugify } from './slugify'

type TableProps = {
  data: {
    headers: string[]
    rows: string[][]
  }
}

function Table({ data }: TableProps) {
  let headers = data.headers.map((header, index) => <th key={index}>{header}</th>)
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

type CustomLinkProps = {
  href: string
  children: React.ReactNode
}

function CustomLink(props: any) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <Link
        href={href}
        {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  )
}

type RoundedImageProps = {
  alt: string
  src: string
}

function RoundedImage({ src, alt, ...props }: RoundedImageProps & any) {
  return (
    <Image
      src={src}
      alt={alt}
      className="shadow-neumorphic overflow-hidden rounded-lg border"
      {...props}
    />
  )
}

interface CalloutProps {
  emoji: React.ReactNode
  children: React.ReactNode
}

function Callout({ emoji, children, ...props }: CalloutProps) {
  return (
    <div
      className="mb-8 flex items-center gap-2 rounded border border-neutral-200 bg-neutral-50 p-1 px-4 py-3 text-sm text-neutral-900"
      {...props}>
      <div className="mr-4 flex w-4 min-w-[20px] items-center">{emoji}</div>
      <div className="callout w-full">{children}</div>
    </div>
  )
}

interface ProsConsCardProps {
  title: string
  items: string[]
}

function ProsCard({ title, items }: ProsConsCardProps) {
  return (
    <div className="my-4 w-full rounded-xl border border-emerald-200 bg-neutral-50 p-6">
      <span>{`You might use ${title} if...`}</span>
      <div className="mt-4">
        {items.map((pro) => (
          <div
            key={pro}
            className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 h-4 w-4">
              <svg
                className="h-4 w-4 text-emerald-500"
                viewBox="0 0 24 24">
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <path d="M22 4L12 14.01l-3-3" />
                </g>
              </svg>
            </div>
            <span>{pro}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ConsCard({ title, items }: ProsConsCardProps) {
  return (
    <div className="my-6 w-full rounded-xl border border-red-200 bg-neutral-50 p-6">
      <span>{`You might not use ${title} if...`}</span>
      <div className="mt-4">
        {items.map((con) => (
          <div
            key={con}
            className="mb-2 flex items-baseline font-medium">
            <div className="mr-2 h-4 w-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-4 w-4 text-red-500">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </div>
            <span>{con}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface CodeProps {
  children: string
}

function Code({ children, ...props }: CodeProps) {
  let codeHTML = highlight(children)
  return (
    <code
      dangerouslySetInnerHTML={{ __html: codeHTML }}
      {...props}
    />
  )
}

function createHeading(level: number) {
  const HeadingComponent = ({ children }: { children: string }) => {
    let slug = slugify(children)
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children,
    )
  }
  HeadingComponent.displayName = `Heading${level}`
  return HeadingComponent
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  Callout,
  ProsCard,
  ConsCard,
  code: Code,
  Table,
}

export function CustomMDX(props: any) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
